import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
          tokenPayload: JSON.stringify({
            timestamp: Date.now(),
          }),
          addRandomSuffix: false
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('blob upload completed', blob, tokenPayload);

        try {
          console.log('File uploaded successfully:', blob.url);
        } catch (error) {
          console.error('Error updating user:', error);
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error en: api/blobRoute" + error)
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
