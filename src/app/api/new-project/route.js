
import { NextResponse } from 'next/server';


export async function POST(request) {
  return NextResponse.redirect(new URL('/protected/new-project', request.url), {
    status: 303,
});
}
