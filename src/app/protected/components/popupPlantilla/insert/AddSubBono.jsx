'use client'
import style from './plantilla.module.css'
import { useState, useEffect } from 'react'

import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';
import { useFetchBackend } from '@/hooks/useFetchApi';


export default function AddSubBono({ onClose, router }) {
    const [formData, setFormData] = useState({
      nombre: '',
      tipo_bono_id: '',
      tabla: 'tipos_bono',
    })

    const [bonos, setBonos] = useState()
  
    useEffect(()=> {
        useFetchBackend(`getBonosSimple`, "GET")
            .then((data) => {
                setBonos(data)
        })
    }, [])
  
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

        <label htmlFor="tipo_bono_id">Elija una entidad</label>
        <select 
        name="tipo_bono_id" 
        id="tipo_bono_id" 
        value={formData.tipo_bono_id}
        className={style.newModalInput}
        onChange={e => handleChange(e, setFormData)}
        >
            {
                bonos &&
                bonos.map((bono) =>(
                    <option value={bono.id} key={bono.id}>
                        {bono.nombre}
                    </option>
                ))
            }
        </select>
  
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