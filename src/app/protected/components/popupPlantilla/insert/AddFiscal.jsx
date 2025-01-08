'use client'
import style from './plantilla.module.css'
import { useState, useEffect } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';
import { useFetchBackend } from '@/hooks/useFetchApi';

export default function AddFiscal({ onClose, router }) {
    const [formData, setFormData] = useState({
      nombre: '',
      apellido1: '',
      apellido2: '',
      telefono: '', 
      correo_electronico: '', 
      tabla: 'fiscales',
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
        <h1>Añadir Nuevo Fiscal</h1>
  
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

        <label htmlFor="telefono">Teléfono: </label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          className={style.newModalInput}
          onChange={e => handleChange(e, setFormData)}
        />

        <label htmlFor="correo_electronico">Email: </label>
        <input
          type="text"
          name="correo_electronico"
          value={formData.correo_electronico}
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