// src/app/api/login/route.js


import { NextResponse } from 'next/server';

export async function POST(request) {


  const data = await request.formData();
  const tags = data.get('tags');
  const tagsArray = tags.split(',');

  const jsonData = {}

  

  if (tagsArray[0] == '') {
    return NextResponse.redirect(new URL('/search', request.url), {
      status: 303,
  });
  } else{

    tagsArray.forEach(item => {
      // Split the string into category and value
      const [category, value] = item.split(':').map(part => part.trim());
  
      const formattedValue = value.replace(/ /g, '_');
    
      // Initialize the category array if it doesn't exist
      if (!jsonData[category]) {
        jsonData[category] = [];
      }
    
      // Add the value to the corresponding category
      jsonData[category].push(formattedValue);
    });

    console.log(tagsArray)
    console.log(jsonData)

    const bonoString = jsonData.Bono ? jsonData.Bono.join(',') : null;
    console.log(bonoString)

    const entidadString = jsonData.Entidad ? jsonData.Entidad.join(',') : null;
    console.log(entidadString)

    const newURL = '/search?' + 
      `${ bonoString != null ? "bono=" + bonoString : ''}` + 
      `${ entidadString != null ? "&entidad=" + entidadString : ''}`
    return NextResponse.redirect(new URL(newURL, request.url), {
      status: 303,
  });
  }
  return NextResponse.redirect(new URL('/search', request.url), {
    status: 303,
    
});

  
}

