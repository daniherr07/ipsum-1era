'use client'

import { useState } from "react";
import NavBar from "../components/navbar/Navbar";
import Delete from "./components/Delete/Delete";
import Users from "./components/users";
import style from "./userList.module.css"
import UpdatePop from "./components/Update/UpdatePop";




export default function UserList(){
    const [deletePopup, setDeletePopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);


    return(
        <>
        <NavBar />
        <main className={style.main}>

                {deletePopup && (
                    <Delete 
                        item={selectedItem} 
                        onClose={() => setDeletePopup(false)} 
                    />
                )}

                {updatePopup && (
                    <UpdatePop 
                        item={selectedItem} 
                        onClose={() => setUpdatePopup(false)} 
                    />
                )}
            
            <table className={style.userTable}>
                <thead className={style.thead}>
                    <tr>
                        <th className={style.theadText}>Primer Apellido</th>
                        <th className={style.theadText}>Segundo Apellido</th>
                        <th className={style.theadText}>Nombre</th>
                        <th className={style.theadText}>Editar</th>
                    </tr>
                </thead>
                <Users                         
                    setDeletePopup={setDeletePopup} 
                    setUpdatePopup={setUpdatePopup}
                    setSelectedItem={setSelectedItem} 
                />


            </table>
        </main>
        </>
    );
}