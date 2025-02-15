'use client'
import style from './navbar.module.css'
import { useState, useReducer } from 'react'
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
import { useProtectedContext } from '@/app/context/ProtectedContext'
import Image from 'next/image'
import { useDetectClickOutside } from 'react-detect-click-outside';






export default function Accordion() {
    const userData = useProtectedContext()
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });

    const logout = async () => {
        await fetch(`/api/logoff`, {
            method: "POST",
        });

        router.push("/login")
    }

    const confirmModal = (e) => {
        e.preventDefault()
        confirmAlert({
        closeOnClickOutside: false,
        customUI: ({ onClose }) => 
        <GenericModal 
            onClose={onClose} 
            afterFunction={logout}
        />,
        })
    }

    const addSomethingFunction = () => {
    confirmAlert(
        {
        closeOnClickOutside: false,
        customUI: ({ onClose }) => <AddSomething onClose={onClose} router={router}/>,
        },
        )
    }

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


    return(
            <div className={style.settingsIcon} ref={ref} onClick={() => setOpen(!open)}>
                <Image src={'/gear-solid.svg'} width={30} height={30} className={style.person} alt='person' style={{cursor: "pointer"}}/>

                {
                    open ?
                    <div className={style.floatingBoxSettings}> 
                        <div className={style.settings}>
                            <p className={style.settingText} onClick={() => router.push("/protected/home")}>Buscar</p>
                            <p className={style.settingText} onClick={() => router.push("/protected/search")}>Todos los proyectos</p>
                            <p className={style.settingText} onClick={() => router.push("/protected/new-project")}>Nuevo proyecto</p>
                            {
                                isAdminOrRoot && <p className={style.settingText} onClick={() => router.push("/protected/userList")}>Usuarios</p>
                            }
                            <p className={style.settingText} onClick={addSomethingFunction}>Ajustes</p>
                            <p className={style.settingText} onClick={confirmModal}>Cerrar Sesión</p>
                        </div>
                    </div>
                    :
                    null
                }


            </div>

    )
}

export function AddSomething({ onClose, router, enterTo="Analista"}) {
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    const [type, setType] = useState(enterTo)
    const [accion, setAccion] = useState(true)
    console.log("accionEstado", accion)
  
    return (
      <div className={style.newUserModal}>
        <h1 style={{marginBottom: "1em"}} className={style.ajustesTitle}>Ajustes</h1>
  
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

function GenericModal({ onClose, afterFunction}) {


    return (
      <div className={style.newUserModal}>
        <h1>¿Esta seguro de cerrar sesión?</h1>
        <div className={style.modalBtns}>
  
  
          <button onClick={onClose} className={style.modalCancel}>
            Cancelar
          </button>
          <button className={style.modalUpdate} onClick={() =>  {afterFunction(); onClose()}}>
            Cerrar Sesión
          </button>
  
        </div>
      </div>
    )
  }