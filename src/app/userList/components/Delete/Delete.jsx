'use client'
import style from "./delete.module.css"



export default function Delete({ item, onClose }){
    console.log(item)

    return(
        <div className={style.deleteContainer}>
            <div className={style.deletePopupContainer}>
                <h2>Eliminar a {item.name}?</h2>
                <p>Esta seguro de que quiere eliminar a {item.name} {item.firstLastName} {item.secondLastName}?</p>
                <div className={style.deletePopupButtons}>
                    
                    <button onClick={onClose} className={style.no}>No</button>
                    <button onClick={() => {
                        // Logic for deleting the item
                        onClose(); // Close the popup after action
                    }} className={style.yes}>Si</button>
                </div>
            </div>
        </div>
    )
}