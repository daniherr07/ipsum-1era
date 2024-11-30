'use client'

import style from './navbar/navbar.module.css'
import { useState } from 'react'



export default function Accordion({searchBar = true, userData}){

    console.log(userData.role)

    const [opened, setOpened] = useState(false)

    const handleOpened = () => {
        setOpened(!opened)

    }

    return(
    <div className={style.accordion} style={ opened ?{top: "0"} : {top: "-13.1em"}}> {/* -13.1em */}

        <ul className={style.options}>
            {
                userData.role == "Root" || userData.role == "Admin" ? 
                <li className={style.option}>
                    <form action="/api/users" method='POST' >
                    
                        <button type="submit" style={{background: "none", border: "none"}}>
                            <p className={style.option}>Usuarios</p>
                        </button>
                    </form>
                </li>
                :
                null
            }
                
                <li className={style.option}>
                <form action="/api/users" method='POST' >
                    
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <p className={style.option}>Control de Usuarios</p>
                    </button>
                </form>
                </li>
            

            <li className={style.option}>
                <form action="/api/new-project" method='POST' >
                
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <p className={style.option}>Nuevo proyecto</p>
                    </button>
                </form>
            </li>

            <li className={style.option}>
                <form action="/api/logoff" method='POST' >
                
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <p className={style.option}>Cerrar Sesión</p>
                    </button>
                </form>
            </li>
        </ul>

        <img 
            src={`${opened ? '/hamWhite.svg' :'/hamburger.svg'}`} 
            className={style.ham}
            style={
                opened ?
                {top: "1em", right: "1em"}
                :
                {top: "14.2em", right: "1em"}
            }
            onClick={handleOpened} 
            alt='hamburger'
            />
    </div>
    )
}