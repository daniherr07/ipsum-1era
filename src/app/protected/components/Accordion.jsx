'use client'
import style from './navbar.module.css'
import { useState, useEffect } from 'react'



export default function Accordion({userData = {}}){
    const [opened, setOpened] = useState(false)
    const [windowBool, setWindowBool] = useState(false)

    const isAdminOrRoot = userData.role == 'Admin' || userData.role == 'Root' ? true : false;
 
    useEffect(() => {
        setOpened(false)
        
        function handleResize() { 

            if (window.innerWidth >= 768) {
                setWindowBool(false)
            } else{
                setWindowBool(true)
            }

        }
        
        window.addEventListener("resize", handleResize)
        
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return(
    <>
    <div className={style.accordion} 
    style=
    { opened ?
    
    windowBool ? 
    //Abierto y en Celular
    {right: "-19.6vw", width: "30vw", zIndex: "20", height: "100dvh"} 
    :  
    //Abierto y en Compu
    {right: "-19.6vw", width: "19vw", zIndex: "20", height: "100dvh"} 
    
    : 
    
    windowBool ?  
    //Cerrado y en Celular
    {right: "-50vw", width: "30vw", zIndex: "20", height: "100dvh"} 
    : 

    //Cerrado y en Compu
    {right: "-50vw", width: "19vw", zIndex: "20", height: "100dvh"} 
    
    }>

        

        <ul className={style.options}>
            <li className={style.option}>
                <form action="/api/home" method='POST' >
                    
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <p className={style.option}>Inicio</p>
                    </button>
                </form>
            </li>
            {
                isAdminOrRoot ? 
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
                <form action="/api/search" method='POST' >
                
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <p className={style.option}>Proyectos</p>
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


    </div>
        <img 
                src={`${opened ? '/hamburger.svg' :'/hamburger.svg'}`} 
                className={style.ham}
                style={
                    opened ?
                    

                    windowBool ?  
                    {top: "1em", right: "-10%", zIndex: "100"} : 
                    {top: "1em", right: "-10%", zIndex: "100"}
                    :
                    windowBool ? 
                    {top: "1em", right: "-10%", zIndex: "100"} : 
                    {top: "1em", right: "-10%", zIndex: "100"}
                }
                onClick={() => setOpened(!opened)} 
                alt='hamburger'
                />
    </>
    )
}