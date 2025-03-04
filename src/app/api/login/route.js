// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import { useFetchBackend } from '@/hooks/useFetchApi';

export async function POST(request) {

  try {
      // Obtener los datos del formulario en JSON
      const formData = await request.json();
      console.log('Datos del formulario:', formData);
  
      // Hacer un POST a tu backend
      const backendData = await useFetchBackend('login', 'POST', formData);
      console.log("backendData", backendData)
  
      if (backendData.activated == false) {
        return NextResponse.json({deactivated: true});
      }
  
      if (backendData.authorized) {
        if (backendData.newUser) {
          return NextResponse.json({toChange: true});
        } else{
          const response = NextResponse.json({ toHome: true});
          console.log("backendData", backendData)
          const userData = {
            auth: true,
            userName: backendData.user,
            id: backendData.id,
            role: backendData.rol,
            // Add any other custom fields you need
          };
          response.cookies.set('auth', JSON.stringify(userData), { httpOnly: true, secure: false, maxAge: 60 * 60 * 24 });
          return response;
        }
      } else{
        return NextResponse.json({toError: true});
      }
  } catch (error) {
    console.error("Error en el Login" + error)
    return NextResponse.json({toError: true});
  }


    
}
