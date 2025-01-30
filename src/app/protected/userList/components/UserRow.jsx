'use client'

import { useState } from 'react'
import styles from '../styles/page.module.css'
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useRouter } from 'next/navigation';
import { useFetchBackend } from '@/hooks/useFetchApi';
import { handleChange } from '@/utils/handleChange';



export default function UserRow({ user }) {
    const router = useRouter();
    const [editable, isEditable] = useState(false)
    const roles = ["Ingeniero", "Analista", "Admin", "Root", "Promotor", "Arquitecto", "Analista Admin", "Ingeniero Admin", "Arquitecto Admin"]
    const [userEdit, setUser] = useState({
        id: user.id,
        lastName1: user.last_name1,
        lastName2: user.last_name2,
        userName: user.user_name,
        email: user.email,
        roles: user.role_name
    })



    const submit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.modal}>
                        <h1>Estás seguro?</h1>

                        <div className={styles.modalMain}>
                            <div className={styles.modalOld}>
                                <h2>Viejo</h2>
                                <p>Nombre: {user.user_name}</p>
                                <p>1° Apellido: {user.last_name1}</p>
                                <p>2° Apellido: {user.last_name2}</p>
                                <p>Rol: {user.role_name}</p>
                            </div>

                            <div className={styles.modalNew}>
                                <h2>Nuevo</h2>
                                <p>Nombre: {userEdit.userName}</p>
                                <p>1° Apellido: {userEdit.lastName1}</p>
                                <p>2° Apellido: {userEdit.lastName2}</p>
                                <p>Rol: {userEdit.roles}</p>
                            </div>
                        </div>



                        <div className={styles.modalBtns}>
                            <button
                                className={styles.modalUpdate}
                                onClick={() => {
                                updateChanges();
                                onClose();
                                }}
                            >
                                Actualizar
                            </button>

                            <button 
                            onClick={onClose}
                            className={styles.modalCancel}
                            >Cancelar
                            </button>

                        </div>


                  </div>
                );
              }
        })
    };


    const changeStatus = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.modal}>
                        <h1>¿Estás seguro de {user.activated == 1 ? "desactivar" : "activar"} a {user.user_name} {user.last_name1}?</h1>
                        <p>Este usuario no podrá participar en ningun proyecto si está desactivado</p>

                        <div className={styles.modalBtns}>
                            <button
                                className={styles.modalUpdate}
                                onClick={() => {
                                updateStatus();
                                onClose();
                                }}
                            >
                                {user.activated == 1 ? "Desactivar" : "Activar"}
                            </button>

                            <button 
                            onClick={onClose}
                            className={styles.modalCancel}
                            >Cancelar
                            </button>

                        </div>


                  </div>
                );
              }
        })
    };



    const updateChanges = async ()  => {
        isEditable(!editable)
        const response = await useFetchBackend(`updateUser`, 'POST', userEdit)
        if (response?.errno) {
            throw new Error('Error al guardar el proyecto');
        }
        toast.success("Usuario exitosamente editado!")
    }

    const updateStatus = async ()  => {
        const data = {
            id: user.id,
            activated: user.activated,
        }
        const response = await useFetchBackend(`changeStatus`, 'POST', data)
        if (response?.errno) {
            toast.error(`Hubo un error, intentalo más tarde...`)
        }
        toast.success(`Usuario exitosamente ${user.activated == 1 ? "Desactivado" : "Activado"}`)
        router.refresh();
    }


  return (
    <>

    
    <tr className={`${styles.row} ${user.activated == 0 && styles.rowDeactivated}`}>
        {
            editable ?
            <>
                <td className={styles.cell}>
                    <input className={styles.input} type="text" name='lastName1' value={userEdit.lastName1} onChange={e => handleChange(e, setUser)} />
                </td>

                <td className={styles.cell}>
                    <input className={styles.input} type="text" name='lastName2' value={userEdit.lastName2} onChange={e => handleChange(e, setUser)} /> 
                </td>

                <td className={styles.cell}>
                    <input className={styles.input} type="text" name='userName' value={userEdit.userName} onChange={e => handleChange(e, setUser)} />
                </td>

                <td className={styles.cell}>
                    <input className={styles.input} type="email" name='email' value={userEdit.email} onChange={e => handleChange(e, setUser)} />
                </td>

                <td className={styles.cell}>
                    <select className={styles.input} name="roles" id="roles" onChange={e => handleChange(e, setUser)}>
                        <option value={user.role_name}>{user.role_name}</option>
                        {
                            roles.map((rol, key) => (
                                user.role_name != rol &&
                                <option key={key} value={rol}>{rol}</option>

                            ))
                        }
                    </select>
                </td>
                <td className={`${styles.cell} ${styles.saveContainer}`}  >
                    <p className={styles.updateBtn} onClick={submit} style={{cursor: "pointer"}} >💾</p>
                    <button className={styles.cancelBtn} type='button' onClick={() => isEditable(!editable)} style={{cursor: "pointer"}}>Cancelar</button>    
                </td>
                <td className={`${styles.cell} ${styles.btn}`} onClick={changeStatus} style={{cursor: "pointer"}}>🚫</td>
            </>



            :
            <>
                <td className={styles.cell}>{userEdit.lastName1}</td>
                <td className={styles.cell}>{userEdit.lastName2}</td>
                <td className={styles.cell}>{userEdit.userName}</td>
                <td className={styles.cell}>{userEdit.email}</td>
                <td className={styles.cell}> {userEdit.roles} </td>
                {user.activated == 1 &&
                    <td className={styles.cell} onClick={() => isEditable(!editable)} ><p className={styles.btn} style={{cursor: "pointer"}}>✏️</p></td>
                }
                
                {
                    user.activated == 1 ?
                    <td className={styles.cell}><p className={styles.btn} onClick={changeStatus} style={{cursor: "pointer"}}>🚫</p></td>
                    :
                    <td className={styles.cell}><p className={styles.btn} onClick={changeStatus} style={{cursor: "pointer"}}>✅</p></td>
                }
                
                
            </>
        }

    </tr>
    </>
  )
}

