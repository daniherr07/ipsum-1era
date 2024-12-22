import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix")

  try {
    const { blobs } = await list({
        prefix: "Proyecto " + prefix
    });
    return NextResponse.json({ blobs });
  } catch (error) {
    console.error('Error listing blobs:', error);
    return NextResponse.json({ error: 'Failed to list blobs' }, { status: 500 });
  }
}

