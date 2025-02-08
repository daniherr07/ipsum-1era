import { NextResponse } from 'next/server';
import dropboxV2Api from 'dropbox-v2-api';
import { Readable } from 'stream';

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DROPBOX_ACCESS_TOKEN,
});


// Function to create a new folder
async function createFolder(folderName) {
  return new Promise((resolve, reject) => {
    dropbox({
      resource: 'files/create_folder_v2',
      parameters: {
        path: folderName,
        autorename: true
      },
    }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export async function POST(req) {

  
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const formData = await req.formData();

  const file = formData.get('file');
  const name = formData.get('name');
  const directory = formData.get('directory');
  

  try {
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    // Get folder name
    const folderName = directory;
    const folderPath = `/${folderName}`;

    await dropbox({
      resource: 'files/list_folder',
      parameters: {
        path: `/${directory}`,
      },
    }, async (err, result) => {
      if (err && err.code == 409){
          // Create the folder
          await createFolder(folderPath);
      }
    });


    const fileName = `${folderPath}/${name}`;

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
          if (err) return reject(err);
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
      folder: folderName,
      ok: true
    });
  } catch (error) {
    console.log(error)
    console.error('Error in upload route:', error);
    return NextResponse.json({ message: 'Error uploading file', error: error.message }, { status: 500 });
  }
}