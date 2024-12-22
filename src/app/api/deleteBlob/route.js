import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export async function DELETE(request) {
    const body = await request.json();
    const url = body.url

    del(url)
    return NextResponse.json({ "Succesful Delete": true });


}

