'use client'

import { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import styles from '../styles/page.module.css'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useFetchBackend } from '@/hooks/useFetchApi'
import { handleChange } from '@/utils/handleChange'


export default function AddUser() {
  const roles = ["Ingeniero", "Analista", "Admin", "Root", "Promotor", "Arquitecto", "Analista Admin", "Ingeniero Admin", "Arquitecto Admin"]
  const router = useRouter();

  const newUserSubmit = () => {
    confirmAlert({
      closeOnClickOutside: true,
      customUI: ({ onClose }) => <AddUserModal onClose={onClose} roles={roles} router={router}/>,
    })
  }

  return (
    <button type="button" className={styles.addButton} onClick={newUserSubmit}>
      Agregar usuario nuevo
    </button>
  )
}

function AddUserModal({ onClose, roles, router }) {
  const [userEdit, setUser] = useState({
    lastName1: '',
    lastName2: '',
    userName: '',
    roles: roles[0], // Set default role
    email: ''
  })

  const updateChanges = async () => {
    if (userEdit.userName == '') {
      return toast.error("Nombre sin completar!")
    }

    if (userEdit.lastName1 == '') {
      return toast.error("Primer apellido sin completar!")
    }

    if (userEdit.lastName2 == '') {
      return toast.error("Segundo apellido sin completar!")
    }

    if (userEdit.email == '') {
      return toast.error("Email sin completar!")
    }

    if (userEdit.roles == '') {
      return toast.error("Rol sin completar!")
    }
    const response = await useFetchBackend("addUser", "POST", userEdit)

    if (response?.errno) {
      
      return toast("Error al guardar usuarios")

      
    }

    // Reload page here
    toast.success("Usuario añadido exitosamente!");
    onClose(); // Close the modal
    router.refresh(); // Refresh the page
  }

  return (
    <div className={styles.newUserModal}>
      <h1>Añadir nuevo usuario</h1>

      <label htmlFor="userName">Nombre: </label>
      <input
        type="text"
        name="userName"
        value={userEdit.userName}
        className={styles.newModalInput}
        onChange={e => handleChange(e, setUser)}
      />

      <label htmlFor="lastName1">1° Apellido: </label>
      <input
        type="text"
        name="lastName1"
        value={userEdit.lastName1}
        className={styles.newModalInput}
        onChange={e => handleChange(e, setUser)}
      />

      <label htmlFor="lastName2">2° Apellido: </label>
      <input
        type="text"
        name="lastName2"
        value={userEdit.lastName2}
        className={styles.newModalInput}
        onChange={e => handleChange(e, setUser)}
      />

      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        value={userEdit.email}
        className={styles.newModalInput}
        onChange={e => handleChange(e, setUser)}
      />

      <label htmlFor="roles">Rol: </label>
      <select
        name="roles"
        id="roles"
        value={userEdit.roles}
        className={styles.newModalInput}
        onChange={e => handleChange(e, setUser)}
      >
        {roles.map((rol, key) => (
          <option key={key} value={rol}>
            {rol}
          </option>
        ))}
      </select>

      <div className={styles.modalBtns}>
        <button className={styles.modalUpdate} onClick={updateChanges}>
          Añadir
        </button>
        <button onClick={onClose} className={styles.modalCancel}>
          Cancelar
        </button>
      </div>
    </div>
  )
}

