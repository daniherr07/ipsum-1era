import { NextResponse } from 'next/server';

export function middleware(request) {
    // Verificar si la cookie "auth" existe
    const authCookie = request.cookies.get('auth');
    
    // Si la cookie no existe, redirige a la página de login
    if (!authCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// Aplica el middleware solo en la ruta de 'protected'
export const config = {
    matcher: '/protected/:path*',
};
