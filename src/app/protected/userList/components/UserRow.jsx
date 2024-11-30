'use client'

import { useState } from 'react'
import styles from '../styles/page.module.css'
import UserPopup from './UserPopup'

export default function UserRow({ user }) {
    const [editable, isEditable] = useState(false)
    const roles = ["Ingeniero", "Analista", "Admin", "Root", "Promotor"] 

  return (
    
    <tr className={styles.row}>
        {
            editable ?
            <>
                <td className={styles.cell}>
                    <input type="text" name='userName' defaultValue={user.last_name1} />
                </td>

                <td className={styles.cell}>
                    <input type="text" name='userName' defaultValue={user.last_name2} /> 
                </td>

                <td className={styles.cell}>
                    <input type="text" name='userName' defaultValue={user.user_name} />
                </td>

                <td className={styles.cell}>
                    <select name="roles" id="roles">
                        <option value={user.role_name}>{user.role_name}</option>
                        {
                            roles.map((rol, key) => (
                                user.role_name != rol &&
                                <option key={key} value={rol}>{rol}</option>

                            ))
                        }
                    </select>
                </td>
                <td className={styles.cell}  >
                    <p onClick={() => isEditable(!editable)} >💾</p>
                    <button type='button' onClick={() => isEditable(!editable)}>Cancelar</button>    
                </td>
                <td className={styles.cell}>🚫</td>
            </>



            :
            <>
                <td className={styles.cell}>{user.last_name1}</td>
                <td className={styles.cell}>{user.last_name2}</td>
                <td className={styles.cell}>{user.user_name}</td>
                <td className={styles.cell}> {user.role_name} </td>
                <td className={styles.cell} onClick={() => isEditable(!editable)} >✏️</td>
                <td className={styles.cell}>🚫</td>
            </>
        }

    </tr>
  )
}

