'use client'

import { useState, useEffect } from 'react'
import style from "../newproject.module.css"
import { handleChange } from '@/utils/handleChange'
import { useFetchBackend } from '@/hooks/useFetchApi';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { AddSomething } from '../../components/Accordion';
import { useRouter } from 'next/navigation';

export default function Datosdelproyecto({ projectData, setProjectData }) {
    const router = useRouter()
    const [tipos_bonos, setBonos] = useState([])
    const [update, setUpdate] = useState(false)
    const [grupos, setGrupos] = useState()

    const addSomethingFunction = (enterTo = "Analista") => {
        confirmAlert({
          customUI: ({ onClose }) => <AddSomething onClose={() => {onClose(), setUpdate(!update)}} router={router} enterTo={enterTo} />,
        })
      }

    const handleChangeNew = (e) => {
        const { name, value } = e.target;

        if (value == "" || value == "nuevo") {
            switch (name) {
                case "bonoSeleccionado":
                    addSomethingFunction("Bono")
                    break;
                case "grupoSeleccionado":
                    addSomethingFunction("Grupo")
                    break;
                default:
                    break;
            }
        }


    }

    const handleSubtipoClick = (id) => {
        setProjectData(prevData => ({
            ...prevData,
            subtipoSeleccionado: id
        }));

    };

    function handleChangeBono (event) {
        const { name, value, type, checked } = event.target;
        setProjectData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
          subtipoSeleccionado: "",
        }));
    };

    useEffect(() => {
        useFetchBackend("getBonos", "GET")
            .then((fetchedData) => {
                setBonos(fetchedData);
            })
            .catch((error) => console.error('Error fetching admin data:', error));
    }, [update]);

    useEffect(() => {
        useFetchBackend("getGrupos", "GET")
            .then((fetchedData) => {
                setGrupos(fetchedData);
            })
            .catch((error) => console.error('Error fetching admin data:', error));
    }, [update]);

    return(
        <div className={style.datoscontainer1}>
            <div className={style.titulocontainer1}>
                <h1 style={{width: "100%"}}>Nuevo caso - Datos del proyecto</h1>
            </div>
            
            <main className={style.maincontainer1}>
                <div className={style.containerizquierda1}>
                    <div className={style.input1}>
                        <input
                            type="checkbox"
                            name="hasFIS"
                            checked={projectData.hasFIS}
                            onChange={e => handleChange(e, setProjectData)}
                            style={{marginRight: "1em"}}
                            className={style.booleanInput1}
                        />
                        <p className={style.textInput1}>¿Tiene Ficha de informacion social (FIS)?</p>
                    </div>

                    <h2 className={style.textoinput1}>Seleccione el tipo de bono</h2>

                    <select
                        className={style.selecttipo1}
                        name="bonoSeleccionado"
                        value={projectData.bonoSeleccionado}
                        onChange={e => {handleChangeBono(e);  handleChangeNew(e)}}
                    >
                        <option value="">Tipo de bono</option>
                        {tipos_bonos.map((item, key) => (
                            <option value={item.id} key={key}>{item.nombre} {item.activated == 0 && "(Desactivado)"}</option>
                        ))}
                        <option value="nuevo">+ Crear nuevo</option>
                    </select>

                    <h2 className={style.textogrupo}>¿Agrupado?</h2>
                    
                    <select
                        className={style.selecttipo1}
                        name="grupoSeleccionado"
                        value={projectData.grupoSeleccionado}
                        onChange={e => {handleChange(e, setProjectData);  handleChangeNew(e)}}
                    >
                        <option value="">Seleccione un tipo</option>
                        {
                            grupos && grupos.map((grupo) => (
                                <option key={grupo.id} value={grupo.id}>{grupo.nombre} {grupo.activated == 0 && "(Desactivado)"}</option>

                            ))
                        }
                        <option value="nuevo">+ Crear nuevo</option>
                    </select>

                    <label htmlFor="desc">Descripcion Corta</label>
                    <textarea name="desc" id="desc" rows={5} onChange={e => handleChange(e, setProjectData)} value={projectData.desc}></textarea>
                </div>

                <div className={style.containerderecha1}>
                    {tipos_bonos.map((item) => (
                        
                        <div key={item.id} className={style.item_opciones1}>
                            
                            {projectData.bonoSeleccionado == item.id &&
                            item.subtipos.map((subtipo, id) => (
                                <div
                                    key={id}
                                    className={`${style.subtipo} ${projectData.subtipoSeleccionado === subtipo.id ? style.seleccionado : ''}`}
                                    onClick={() => handleSubtipoClick(subtipo.id)}
                                >
                                    <h1>{subtipo.nombre} {subtipo.activated == 0 && "(Desactivado)"}</h1>
                                </div>

                                
                            ))}

                            


                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

