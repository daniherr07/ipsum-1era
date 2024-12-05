'use client'

import { useState } from 'react'
import styles from '../styles/page.module.css'
import { address } from '@/app/const'
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


export default function UserRow({ user }) {
    const [editable, isEditable] = useState(false)
    const roles = ["Ingeniero", "Analista", "Admin", "Root", "Promotor"] 
    const [userEdit, setUser] = useState({
        id: user.id,
        lastName1: user.last_name1,
        lastName2: user.last_name2,
        userName: user.user_name,
        roles: user.role_name
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log(userEdit)
    };



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




    const updateChanges = async ()  => {
        isEditable(!editable)
        console.log("Si llegó")
        const response = await fetch(`${address}/updateUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userEdit),
          });

        if (!response.ok) {
            throw new Error('Error al guardar el proyecto');
        }

        toast.success("Usuario exitosamente editado!")


    }


  return (
    <>

    
    <tr className={styles.row}>
        {
            editable ?
            <>
                <td className={styles.cell}>
                    <input className={styles.input} type="text" name='lastName1' value={userEdit.lastName1} onChange={handleInputChange} />
                </td>

                <td className={styles.cell}>
                    <input className={styles.input} type="text" name='lastName2' value={userEdit.lastName2} onChange={handleInputChange} /> 
                </td>

                <td className={styles.cell}>
                    <input className={styles.input} type="text" name='userName' value={userEdit.userName} onChange={handleInputChange} />
                </td>

                <td className={styles.cell}>
                    <select className={styles.input} name="roles" id="roles" onChange={handleInputChange}>
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
                    <p className={styles.updateBtn} onClick={submit} >💾</p>
                    <button className={styles.cancelBtn} type='button' onClick={() => isEditable(!editable)}>Cancelar</button>    
                </td>
                <td className={`${styles.cell} ${styles.btn}`}>🚫</td>
            </>



            :
            <>
                <td className={styles.cell}>{userEdit.lastName1}</td>
                <td className={styles.cell}>{userEdit.lastName2}</td>
                <td className={styles.cell}>{userEdit.userName}</td>
                <td className={styles.cell}> {userEdit.roles} </td>
                <td className={styles.cell} onClick={() => isEditable(!editable)} ><p className={styles.btn}>✏️</p></td>
                <td className={styles.cell}><p className={styles.btn}>🚫</p></td>
            </>
        }

    </tr>
    </>
  )
}

