'use client'
import style from './plantilla.module.css'
import { useState, useEffect } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';
import { useFetchBackend } from '@/hooks/useFetchApi';

export default function AddCentroNegocio({ onClose, router }) {
    const [formData, setFormData] = useState({
      entidad_id: '1',
      nombre: '',
      direccion: '',
      telefono: '',
      correo_electronico: '', 
      tabla: 'centros_negocios',
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
  
      if (formData.direccion == '') {
        return toast.error("Dirección sin completar!")
      }
  
      if (formData.telefono == '') {
        return toast.error("Teléfono sin completar!")
      }
  
      if (formData.correo_electronico == '') {
        return toast.error("Email sin completar!")
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
        <h1>Añadir Nuevo Centro de Negocio</h1>

        <label htmlFor="entidad_id">Elija una entidad</label>
        <select 
        name="entidad_id" 
        id="entidad_id" 
        value={formData.entidad_id}
        className={style.newModalInput}
        onChange={e => handleChange(e, setFormData)}
        >
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
  
        <label htmlFor="direccion">Direccion: </label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
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