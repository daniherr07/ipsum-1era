import { NextResponse } from 'next/server';
import dropboxV2Api from 'dropbox-v2-api';

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DROPBOX_ACCESS_TOKEN,
});

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
    console.error('Error in getOrCreateSharedLink:', error);
    throw error;
  }
}

export async function GET(request) {
const { searchParams } = new URL(request.url);
const prefix = searchParams.get("prefix")
  try {
    const result = await new Promise((resolve, reject) => {
      dropbox({
        resource: 'files/list_folder',
        parameters: {
          path: `/${prefix}`,
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
    console.log("Entro al catch")

    if (error.code == 409) {
      console.log("Entro al error 1")
      return NextResponse.json({ msg: "La ruta no existe", route_not_found : true });
    } else {
      console.error('Error in GET route:', error);
      return NextResponse.json({ message: 'Error fetching files', error: error.message }, { status: 500 });
    }


  }
}