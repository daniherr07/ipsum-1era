'use client'
import { useFetchBackend } from '@/hooks/useFetchApi';
import style from './plantilla.module.css'
import { useState, useEffect } from 'react'

import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';


export default function AddAnalista({ onClose, router }) {
    const [formData, setFormData] = useState({
      entidad_id: '',
      nombre: '',
      apellido1: '',
      apellido2: '', 
      correo_electronico: '',
      telefono: '',
      tabla: 'analistas_entidades',
    })

    const [entidades, setEntidades] = useState()
  
    useEffect(()=> {
        useFetchBackend(`getEntidades`, "GET")
            .then((data) => {
                console.log(data)
                setEntidades(data)
        })
    }, [])

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
    
        if (formData.correo_electronico == '') {
        return toast.error("Email sin completar!")
        }
    
        if (formData.telefono == '') {
        return toast.error("Telefono sin completar")
        }
      const response = await useFetchBackend("insertData", "POST", formData)

      console.log(response)
  
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
        <h1 className={style.insertTitle}>Analista de Entidad</h1>


        <label htmlFor="entidad_id">Elija una entidad</label>
        <select 
        name="entidad_id" 
        id="entidad_id" 
        value={formData.entidad_id}
        className={style.newModalInput}
        onChange={e => handleChange(e, setFormData)}
        >
            <option value="">
                Seleccione una entidad
            </option>
            {
                entidades &&
                entidades.map((entidad) =>(
                    <option value={entidad.id} key={entidad.id}>
                        {entidad.nombre}
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
  
        <label htmlFor="apellido1">1° Apellido: </label>
        <input
          type="text"
          name="apellido1"
          value={formData.apellido1}
          className={style.newModalInput}
          onChange={e => handleChange(e, setFormData)}
        />
  
        <label htmlFor="apellido2">2° Apellido: </label>
        <input
          type="text"
          name="apellido2"
          value={formData.apellido2}
          className={style.newModalInput}
          onChange={e => handleChange(e, setFormData)}
        />
  
        <label htmlFor="correo_electronico">Email: </label>
        <input
          type="correo_electronico"
          name="correo_electronico"
          value={formData.correo_electronico}
          className={style.newModalInput}
          onChange={e => handleChange(e, setFormData)}
        />
  
        <label htmlFor="telefono">Teléfono </label>
        <input
          type="telefono"
          name="telefono"
          value={formData.telefono}
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