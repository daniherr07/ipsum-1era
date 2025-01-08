'use client'
import style from './plantilla.module.css'
import { useState, useEffect } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';
import { useFetchBackend } from '@/hooks/useFetchApi';


export default function AddBono({ onClose, router }) {
    const [formData, setFormData] = useState({
      nombre: '',
      tabla: 'tipos_bono',
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
        <h1>Añadir Nuevo Bono</h1>
  
        <label htmlFor="nombre">Nombre: </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
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