import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.redirect(new URL('/login', request.url), {
    status: 303,
});

  // Delete the cookie by setting it with an empty value and past expiration
  response.cookies.set('auth', '', {
    expires: new Date(0), // Expire immediately
    path: '/',            // Ensure the path matches where the cookie was set
  });

  return response;
}