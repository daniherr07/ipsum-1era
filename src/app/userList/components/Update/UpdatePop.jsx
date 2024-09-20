'use client'
import Image from "next/image";
import style from "./update.module.css"



export default function UpdatePop({ item, onClose }){

    return(
        <div className={style.editContainer}>
            <div className={style.editPopupContainer}>
                <Image 
                    src={"close.svg"} 
                    width={15} 
                    height={15}
                    className={style.closeWindow}
                    onClick={() => {onClose();}}
                />
                <div className={style.editUser}>
                    <h3 className={style.generalTitle}>Editar Usuario</h3>
                    <div className={style.editUserInputs}>
                        <input type="text" className={style.input} placeholder={item.name}/>
                        <input type="text" className={style.input} placeholder={item.firstLastName}/>
                        <input type="text" className={style.input} placeholder={item.secondLastName}/>
                    </div>
                </div>

                <div className={style.editRoles}>
                    <h3 className={style.generalTitle}>Editar roles de usuario</h3>
                    <div className={style.rolesContainer}>
                        <div className={style.addRole}>
                            <h3 className={style.addRoleTitle}>Agregar Rol</h3>
                            <select name="rols" id="" className={style.select}>
                                <option value="">Selecciona el rol</option>
                                <option value="1">1</option>
                                <option value="2">3</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className={style.deleteRoles}>
                            {
                            item.roles.map(role => (
                                <div key={role.id} className={style.role} style={{backgroundColor: `${role.color}`}} >
                                    <p>{role.name}</p>
                                    <Image src={"close.svg"} width={15} height={15} />
                                </div>
                            ))
                            }
                        </div>
                    </div>

                </div>

                <div className={style.saveButton} onClick={() => {onClose();}}>
                    <p >Guardar</p>
                    <Image src={"save.svg"} width={15} height={15} />
                </div>
            </div>
        </div>
    )
}