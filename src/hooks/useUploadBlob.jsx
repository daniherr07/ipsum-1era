

'use client';

import { useState } from 'react';
import { upload } from '@vercel/blob/client';

export function UseUploadBlob() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadFile = async (file, name, directory = "") => {
    if (!file) return null;

    setIsUploading(true);
    setUploadError(null);

    try {
      
      const newBlob = await upload(`Proyecto ${directory}/${name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/blobRoute',

      });
      return newBlob;
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