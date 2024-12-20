// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import { useFetchBackend } from '@/hooks/useFetchApi';

export async function POST(request) {
    // Obtener los datos del formulario en JSON
    const formData = await request.json();
    console.log('Datos del formulario:', formData);

    // Hacer un POST a tu backend

    // Manejar la respuesta del backend si es necesario
    const backendData = await useFetchBackend('changePassword', 'POST', formData);

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
