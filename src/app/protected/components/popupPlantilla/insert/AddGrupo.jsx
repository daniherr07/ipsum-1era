'use client'
import style from './plantilla.module.css'
import { useState, useEffect } from 'react'

import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';
import { useFetchBackend } from '@/hooks/useFetchApi';

export default function AddGrupo({ onClose, router }) {
    const [formData, setFormData] = useState({
      nombre: '',
      descripcion: '',
      tabla: 'grupos_proyectos',
    })
  
    const updateChanges = async () => {
      if (formData.nombre == '') {
        return toast.error("Nombre sin completar!")
      }

      const response = await useFetchBackend("insertData", "POST", formData)

      if (response.errno) {
        toast.error('Error al insertar datos');
      }

      
  
      // Reload page here
      toast.success("Datos insertados exitosamente!");
      onClose(); // Close the modal
      router.refresh(); // Refresh the page
    }
  
    return (
      <div className={style.newUserModal}>
        <h1>Añadir Nuevo Grupo</h1>
  
        <label htmlFor="nombre">Nombre: </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          className={style.newModalInput}
          onChange={e => handleChange(e, setFormData)}
        />

        <label htmlFor="descripcion">Descripcion: </label>
        <textarea 
        name="descripcion"
        value={formData.descripcion} 
        className={style.newModalInput}
        onChange={e => handleChange(e, setFormData)}
        id=""></textarea>

  
        <div className={style.modalBtns}>
          <button className={style.modalUpdate} onClick={updateChanges}>
            Añadir
          </button>
          <button onClick={onClose} className={style.modalCancel}>
            Cancelar
          </button>
        </div>
      </div>
    )
  }