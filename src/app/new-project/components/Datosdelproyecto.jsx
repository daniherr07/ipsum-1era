import style from "../newproject.module.css"
import React, { useState } from "react";
export default function Datosdelproyecto(){
    const [bonoSeleccionado, useBonoSeleccionado] = useState(null)
    const [subtipoSeleccionado, setSubtipoSeleccionado] = useState(null);
    const tipos_bonos = [{
        "id": 0,
        "nombre": "Construccion en lote propio",
        "subtipos":[
                "Bono ordinario",
                "Bono crédito",
                "Adulto mayor",
                "Discapacidad"
                ]
        },
        {
            "id": 1,
            "nombre": "RAMT",
            "subtipos":[]
        },
        {
            "id": 2,
            "nombre": "Artículo 59",
            "subtipos":[
                    "Núcleo típico",
                    "Núcleo numeroso",
                    "Adulto mayor",
            ]
        },
]
const handleSubtipoClick = (id) => {
    setSubtipoSeleccionado(id);
  };
    return(
        <>
        <div className={style.datoscontainer1}>
            <h1 className={style.titulocontainer1}>Nuevo caso - Datos del proyecto</h1>
            <div className={style.maincontainer1}>
                <div className={style.containerizquierda1}>
                    <label htmlFor="" className={style.input1}><input type="checkbox" name="" id="" />¿Tiene Ficha de informacion social (FIS)?</label>
                    <h2 className={style.textoinput1}>Seleccione el tipo de bono</h2>
                    <select className={style.selecttipo1} value={bonoSeleccionado} onChange={x => useBonoSeleccionado(x.target.value)}>
                    <option value="">Tipo de bono</option>
                    {   
                        tipos_bonos.map((item) => (
                            <option value={`${item.nombre}`}>{`${item.nombre}`}</option>
                        ))
                    }
                    </select>
                    {/*Ahorita hago los botones */}
                    <h2 className={style.textogrupo}>Agrupado en</h2>
                    
                    <input disabled={!bonoSeleccionado} type="text" placeholder="Sin grupo asignado" className={style.inputgrupo1}/> {/*Como el de la barra de nav */}
                </div>
                <div className={style.containerderecha1}>
                    {tipos_bonos.map((item) => (
                    <div key={item.id} className={style.item_opciones1}>
                        {bonoSeleccionado === item.nombre &&
                        item.subtipos.map((subtipo, id) => (
                            <div
                            key={id}
                            className={`${style.subtipo} ${
                                subtipoSeleccionado === id ? style.seleccionado : null
                            }`}
                            onClick={() => handleSubtipoClick(id)}
                            >
                            <h1>{subtipo}</h1>
                            </div>
                        ))}
                    </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}