// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import { address } from '@/app/const';

export async function POST(request) {
    // Obtener los datos del formulario en JSON
    const formData = await request.json();
    console.log('Datos del formulario:', formData);

    // Hacer un POST a tu backend
    const backendResponse = await fetch(`${address}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Manejar la respuesta del backend si es necesario
    const backendData = await backendResponse.json();

    if (backendData.activated == false) {
      return NextResponse.json({deactivated: true});
    }

    if (backendData.authorized) {
      if (backendData.newUser) {
        return NextResponse.json({toChange: true});
      } else{
        const response = NextResponse.json({ toHome: true});
        console.log(backendData)
        const userData = {
          auth: true,
          userName: backendData.user,
          role: backendData.rol,
          // Add any other custom fields you need
        };
        response.cookies.set('auth', JSON.stringify(userData), { httpOnly: true, secure: false, maxAge: 60 * 60 * 24 });
        return response;
      }
    } else{
      return NextResponse.json({toError: true});
    }

    
}
