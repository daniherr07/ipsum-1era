import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export async function DELETE(request) {
    const body = await request.json();
    const url = body.url

    try {
        del(url)
    } catch (error) {
        console.log(error)
    }
    
    return NextResponse.json({ "Succesful Delete": true });


}

