import { NextResponse } from 'next/server';
import dropboxV2Api from 'dropbox-v2-api';
import { Readable } from 'stream';

import axios from 'axios'
const CLIENT_ID = process.env.DROPBOX_CLIENT_ID;
const CLIENT_SECRET = process.env.DROPBOX_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN;

async function getAccessToken() {
    try {
        const response = await axios.post("https://api.dropbox.com/oauth2/token", new URLSearchParams({
            refresh_token: REFRESH_TOKEN,
            grant_type: "refresh_token",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }).toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Error obteniendo el access token en api/uploadFile:", error.response.data);
        return null;
    }
}

// Ejecutar para obtener un nuevo token
const token = await getAccessToken();

const dropbox = dropboxV2Api.authenticate({
  token: token,
});


// Function to create a new folder
async function createFolder(folderName) {

  try {
    return new Promise((resolve, reject) => {
      dropbox({
        resource: 'files/create_folder_v2',
        parameters: {
          path: folderName,
          autorename: true
        },
      }, (err, result) => {
        if (err){
          console.error("Error creando el folder en createFolder", folderName, err)
          return reject(err);
        } 
        resolve(result);
      });
    });
  } catch (error) {
    console.error("Error creando el folder en createFolder", folderName, error)
  }

}

export async function POST(req) {

  
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await req.formData();

    const file = formData.get('file');
    const name = formData.get('name');
    const directory = formData.get('directory');
    const rootName = formData.get('rootName');
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    const rootNameFormatted = formatString(rootName)
    const directoryFormatted = formatString(directory)

    // Get folder name
    const folderPath = `${rootNameFormatted}/${directoryFormatted}`;

    await dropbox({
      resource: 'files/list_folder',
      parameters: {
        path: folderPath,
      },
    }, async (err, result) => {
      if (err && err.code == 409){
          // Create the folder
          await createFolder(folderPath);
      }
    });


    const fileName = `/${folderPath}/${name}`;

    const uploadResult = await new Promise((resolve, reject) => {
      dropbox({
        resource: 'files/upload',
        parameters: {
          path: fileName,
          mode: 'add',
          autorename: true,
        },
        readStream: stream,
      }, (err, result) => {
        if (err) {
          console.error('Dropbox upload error:', err);
          return reject(err);
        }
        resolve(result);
      });
    });

    console.log(uploadResult)


    let sharedLinkResponse;
    try {
      // Try to create a new shared link
      sharedLinkResponse = await new Promise((resolve, reject) => {
        dropbox({
          resource: 'sharing/create_shared_link_with_settings',
          parameters: {
            path: fileName,
            settings: {
              requested_visibility: 'public',
            },
          },
        }, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    } catch (error) {
      console.log(error)
      // If the shared link already exists, get the existing one
      if (error.error && error.error['.tag'] === 'shared_link_already_exists') {
        sharedLinkResponse = await new Promise((resolve, reject) => {
          dropbox({
            resource: 'sharing/list_shared_links',
            parameters: {
              path: fileName,
              direct_only: true,
            },
          }, (err, result) => {
            if (err) {
              console.error('Error getting existing shared link:', err);
              return reject(err);
            }
            if (result.links && result.links.length > 0) {
              resolve(result.links[0]);
            } else {
              reject(new Error('No existing shared link found'));
            }
          });
        });
      } else {
        // If it's a different error, throw it
        throw error;
      }
    }

  

    const fileUrl = sharedLinkResponse.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

    return NextResponse.json({
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileUrl,
      folder: folderPath,
      ok: true
    });
  } catch (error) {
    console.error('Error in upload route en api/uploadFile/Post:', error);
    return NextResponse.json({ message: 'Error uploading file', error: error.message }, { status: 500 });
  }
}


function formatString(str) {
  // First trim the string to remove trailing spaces
  const trimmed = str.trim();
  
  // Then replace all spaces with underscores
  const formatted = trimmed.replace(/ /g, '_');
  
  return formatted;
}