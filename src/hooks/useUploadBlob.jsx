

'use client';

import { useState } from 'react';

export function UseUploadBlob() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadFile = async (file, name, directory = "", rootName) => {
    if (!file) return null;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append("name", name)
      formData.append("directory", directory)
      formData.append("rootName", rootName)

      const response = await fetch(`/api/uploadFile`, {
        method: "POST",
        body: formData
      })


      const result = await response.json()

      

      if (!result.ok) {
        throw new Error("No se pudo subir el archivo", result)
      }


      return JSON.stringify({result, ok: true});
    } catch (error) {
      console.log(error)
      setUploadError(error.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, uploadError };
}