// src/app/api/login/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
    // Obtener los datos del formulario en JSON
    const formData = await request.json();
    console.log('Datos del formulario:', formData);

    // Hacer un POST a tu backend
    const backendResponse = await fetch('https://ipsum-backend.vercel.app/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Manejar la respuesta del backend si es necesario
    const backendData = await backendResponse.json();

    if (backendData.pswError) {
      return NextResponse.json({pswError: true});
    }

    if (backendData.userError) {
      return NextResponse.json({userError: true});
    }

    if (backendData.emailError) {
      return NextResponse.json({emailError: true});
    }
    
    return NextResponse.json({toLogin: true});


    
}
