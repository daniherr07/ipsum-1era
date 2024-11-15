import style from "../newproject.module.css"
import React, { useState } from "react";
export default function Datosadministrativos(){
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
            <h1 className={style.titulocontainer1}>Nuevo caso - Datos administrativos</h1>
            <div className={style.maincontainer1}>
                <div className={style.containerizquierda1}>
                    <h2 className={style.textoinput1}>Entidad</h2>
                    <select className={style.selecttipo1} value={bonoSeleccionado} onChange={x => useBonoSeleccionado(x.target.value)}>
                        <option value="Mutual Alajuela">Mutual Alajuela</option>
                    </select>
                    <select className={style.selecttipo1} value={bonoSeleccionado} onChange={x => useBonoSeleccionado(x.target.value)}>
                        <option value="Mutual Alajuela Centro">Mutual Alajuela Centro</option>
                    </select>
                    <div className={style.flexizquierda1}>
                        <div className={style.minitextos}>
                            <h2 className={`${style.textogrupo}`}>APC</h2>
                            <input type="text" placeholder="123456" className={`${style.inputgrupo1} ${style.textospeques}`}/> {/*Como el de la barra de nav */}  
                        </div>
                        <div className={style.minitextos}>
                            <h2 className={style.textogrupo}>CFIA</h2>
                            <input type="text" placeholder="OC 123456" className={`${style.inputgrupo1} ${style.textospeques}`}/> {/*Como el de la barra de nav */}
                        </div> 
                    </div>
                    
                </div>
                <div className={style.containerizquierda1}>
                    <h2 className={style.textogrupo}>Analista Entidad</h2>
                    <input type="text" placeholder="Yuliana Fonseca Martínez" className={style.inputgrupo1}/> {/*Como el de la barra de nav */}
                    <h2 className={style.textogrupo}>Analista IPSUN</h2>
                    <input type="text" placeholder="Magdalena Hernández Aguilar" className={style.inputgrupo1}/> {/*Como el de la barra de nav */}
                    <h2 className={style.textogrupo}>Fiscal Asignado</h2>
                    <input type="text" placeholder="María Cristina Fernández" className={style.inputgrupo1}/> {/*Como el de la barra de nav */}
                </div>
                <div className={style.containerizquierda1}>
                    <div className={style.flexizquierda1}>
                        <div className={style.minitextos}>
                            <h2 className={`${style.textogrupo}`}>Presupuesto</h2>
                            <input type="text" placeholder="9 200 000" className={`${style.inputgrupo1} ${style.textospeques}`}/> {/*Como el de la barra de nav */}  
                        </div>
                        <div className={style.minitextos}>
                            <h2 className={style.textogrupo}>Avaluo</h2>
                            <input type="text" placeholder="7 200 000" className={`${style.inputgrupo1} ${style.textospeques}`}/> {/*Como el de la barra de nav */}
                        </div> 
                    </div>
                    <h2 className={style.textogrupo}>Ingeniero Asignado</h2>
                    <input type="text" placeholder="Ing. Steven Corrales" className={style.inputgrupo1}/> {/*Como el de la barra de nav */}
                </div>    
            </div>
        </div>
        </>
    )
}