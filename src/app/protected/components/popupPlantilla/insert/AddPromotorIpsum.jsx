'use client'
import style from './plantilla.module.css'
import { useState, useEffect } from 'react'

import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';
import { useFetchBackend } from '@/hooks/useFetchApi';


export default function AddPromotor({ onClose, router }) {
    const [formData, setFormData] = useState({
      nombre: '',
      apellido1: '',
      apellido2: '',
      activated: '1',
      tabla: 'promotores_ipsum',
    })
  
    const updateChanges = async () => {
      if (formData.nombre == '') {
        return toast.error("Nombre sin completar!")
      }
  
      if (formData.apellido1 == '') {
        return toast.error("Primer apellido sin completar!")
      }
  
      if (formData.apellido2 == '') {
        return toast.error("Segundo apellido sin completar!")
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
        <h1 className={style.insertTitle}>Nuevo Promotor de Ipsum</h1>

        <label htmlFor="nombre">Nombre: </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          className={style.newModalInput}
          onChange={e => handleChange(e, setFormData)}
        />

        <label htmlFor="apellido1">Primer Apellido: </label>
        <input
          type="text"
          name="apellido1"
          value={formData.apellido1}
          className={style.newModalInput}
          onChange={e => handleChange(e, setFormData)}
        />

        <label htmlFor="apellido2">Segundo Apellido: </label>
        <input
          type="text"
          name="apellido2"
          value={formData.apellido2}
          className={style.newModalInput}
          onChange={e => handleChange(e, setFormData)}
        />

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