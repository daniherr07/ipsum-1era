import { NextResponse } from 'next/server';
import dropboxV2Api from 'dropbox-v2-api';

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DROPBOX_ACCESS_TOKEN,
});

export async function DELETE(request) {
    const body = await request.json();
    const pathname = body.pathname

    try {
        await dropbox({
            resource: 'files/delete',
            parameters: {
                'path': `${pathname}`
            }
        }, (err, result, response) => {
        });

    return NextResponse.json({ "Succesful Delete": true });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ "Error": true, err });
    }
    
    

}

