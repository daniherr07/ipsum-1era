import { NextResponse } from 'next/server';
import dropboxV2Api from 'dropbox-v2-api';
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
        console.error("Error obteniendo el access token:", error.response.data);
        return null;
    }
}

const token = await getAccessToken();

const dropbox = dropboxV2Api.authenticate({
  token: token,
});

// Ejecutar para obtener un nuevo token


async function getOrCreateSharedLink(path) {


  try {
    // First, try to get existing shared links
    const existingLinks = await new Promise((resolve, reject) => {
      dropbox({
        resource: 'sharing/list_shared_links',
        parameters: { path, direct_only: true },
      }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (existingLinks.links && existingLinks.links.length > 0) {
      // If a shared link exists, return it
      return existingLinks.links[0];
    }

    // If no shared link exists, create a new one
    return await new Promise((resolve, reject) => {
      dropbox({
        resource: 'sharing/create_shared_link_with_settings',
        parameters: {
          path: path,
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
    console.error('Error in api/getFiles/getOrCreateSharedLink:', error);
    throw error;
  }
}

export async function GET(request) {
const { searchParams } = new URL(request.url);
const prefix = searchParams.get("prefix")
const formattedPrefix = convertStringFormat(prefix)
  try {
    const result = await new Promise((resolve, reject) => {
      dropbox({
        resource: 'files/list_folder',
        parameters: {
          path: `/${formattedPrefix}`,
        },
      }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const files = await Promise.all(result.entries.map(async (entry) => {
      if (entry['.tag'] === 'file') {
        try {
          const sharedLinkResponse = await getOrCreateSharedLink(entry.path_lower);
          const fileUrl = sharedLinkResponse.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');


          return {
            name: entry.name,
            size: entry.size,
            type: entry.type,
            url: fileUrl,
            pathname: entry.path_display
          };
        } catch (error) {
          console.error(`Error processing file ${entry.name}:`, error);
          return null;
        }
      }
      return null;
    }));

    const validFiles = files.filter(file => file !== null);

    return NextResponse.json({ files: validFiles });
  } catch (error) {


    if (error.code == 409) {
      console.log('No es un error: La ruta no existe', error);
      return NextResponse.json({ msg: "La ruta no existe", route_not_found : true });
    } else {
      console.error('Error in GET route:', error);
      return NextResponse.json({ message: 'Error fetching files', error: error.message }, { status: 500 });
    }


  }
}

function convertStringFormat(inputString) {
  // First, handle the special case of spaces around forward slashes
  // by temporarily replacing "space + slash" with a unique marker
  let processed = inputString.replace(/ \//g, "SLASHMARKER");
  
  // Replace all spaces with underscores
  processed = processed.replace(/ /g, '_');
  
  // Restore the forward slashes without spaces
  processed = processed.replace(/SLASHMARKER/g, "/");
  
  return processed;
}