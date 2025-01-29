'use client'
import style from './navbar.module.css'
import { useState, useEffect, useReducer } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddAnalista from './popupPlantilla/insert/AddAnalista'
import { useRouter } from 'next/navigation';
import AddCentroNegocio from './popupPlantilla/insert/AddCentroNegocio'
import AddConstructor from './popupPlantilla/insert/AddConstructor'
import AddEntidad from './popupPlantilla/insert/AddEntidad'
import AddFiscal from './popupPlantilla/insert/AddFiscal'
import AddGrupo from './popupPlantilla/insert/AddGrupo'
import AddPromotor from './popupPlantilla/insert/AddPromotorIpsum'
import AddBono from './popupPlantilla/insert/AddBono'
import AddSubBono from './popupPlantilla/insert/AddSubBono'
import EditGeneric from './popupPlantilla/edit/EditGeneric'






export default function Accordion({userData = {}}){
    const [opened, setOpened] = useState(false)
    const [windowBool, setWindowBool] = useState(false)
    const router = useRouter();

    const isAdminOrRoot = 
    userData.role == 'Admin' 
    || 
    userData.role == 'Root' 
    ||
    userData.role == 'Analista Admin'
    ||
    userData.role == 'Ingeniero Admin'
    ||
    userData.role == 'Arquitecto Admin'
    ? true : false;

        const addSomethingFunction = () => {
          confirmAlert({
            customUI: ({ onClose }) => <AddSomething onClose={onClose} router={router}/>,
          })
        }
 
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
                <button type="submit" style={{background: "none", border: "none"}} onClick={addSomethingFunction}>
                    <p className={style.option}>Mantenimiento</p>
                </button>
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

export function AddSomething({ onClose, router, enterTo="Analista"}) {
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    const [type, setType] = useState(enterTo)
    const [accion, setAccion] = useState(true)
    console.log("accionEstado", accion)
  
    return (
      <div className={style.newUserModal}>
        <h1 style={{marginBottom: "1em"}}>Mantenimiento</h1>
  
        <div className={style.filterSelectContainer}>

            <div className={style.typeContainer}>
                <label htmlFor="type">Agregar Tipo</label>
                <select
                    name="type"
                    id="type"
                    value={type}
                    className={style.newModalInput}
                    onChange={e => setType(e.target.value)}
                >
                    <option value="Analista">
                        Analista de entidad
                    </option>

                    <option value="CentroNegocio">
                        Centro de Negocio
                    </option>

                    <option value="Constructor">
                        Constructor
                    </option>

                    <option value="Entidad">
                        Entidad
                    </option>

                    <option value="Fiscal">
                        Fiscal
                    </option>

                    <option value="Grupo">
                        Grupo
                    </option>

                    <option value="Promotor">
                        Promotor Ipsum
                    </option>

                    <option value="Bono">
                        Bono
                    </option>

                    <option value="Subtipo">
                        Subtipo de bono
                    </option>

                </select>
            </div>

            <div className={style.actionContainer}>
                <button 
                className={style.buttonAccion}
                onClick={() => setAccion(true)}
                style={accion ? {color: "#0058b1", backgroundColor: "#fff", boxShadow: "inset 0px 0px 5px 0px rgba(143,143,143,1)"} : null}
                >
                    Insertar
                </button>

                <button 
                className={style.buttonAccion}
                onClick={() => setAccion(false)}
                style={accion == false ? {color: "#0058b1", backgroundColor: "#fff", boxShadow: "inset 0px 0px 5px 0px rgba(143,143,143,1)"} : null}
                >
                    Ver y Editar
                </button>
            </div>

            

            
            
        </div>

        { accion &&
            < >
            {type == "Analista" &&
                    <AddAnalista onClose={onClose} router={router}/>
                }


                {type == "CentroNegocio" &&
                    <AddCentroNegocio onClose={onClose} router={router}/>
                }

                {type == "Constructor" &&
                    <AddConstructor onClose={onClose} router={router}/>
                }

                {type == "Entidad" &&
                    <AddEntidad onClose={onClose} router={router}/>
                }

                {type == "Fiscal" &&
                    <AddFiscal onClose={onClose} router={router}/>
                }

                {type == "Grupo" &&
                    <AddGrupo onClose={onClose} router={router}/>
                }

                {type == "Promotor" &&
                    <AddPromotor onClose={onClose} router={router}/>
                }

                {type == "Bono" &&
                    <AddBono onClose={onClose} router={router}/>
                }

                {type == "Subtipo" &&
                    <AddSubBono onClose={onClose} router={router}/>
                }
            </>
        }

        { !accion &&
            < >
                {type == "Analista" &&
                    <EditGeneric onClose={onClose} table={"analistas_entidades"}/>
                }

                {type == "CentroNegocio" &&
                    <EditGeneric onClose={onClose} table={"centros_negocios"} />
                }

                {type == "Constructor" &&
                    <EditGeneric onClose={onClose} table={"constructores"} />
                }

                {type == "Entidad" &&
                    <EditGeneric onClose={onClose} table={"entidades"} />
                }

                {type == "Fiscal" &&
                    <EditGeneric onClose={onClose} table={"fiscales"} />
                }

                {type == "Grupo" &&
                    <EditGeneric onClose={onClose} table={"grupos_proyectos"} />
                }

                {type == "Promotor" &&
                    <EditGeneric onClose={onClose} table={"promotores_ipsum"} />
                }

                {type == "Bono" &&
                    <EditGeneric onClose={onClose} table={"tipos_bono"} />
                }

                {type == "Subtipo" &&
                    <EditGeneric onClose={onClose} table={"variantes_bono"} />
                }

            </>
        }

            

    </div>
    )
  }