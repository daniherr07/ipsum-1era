import style from "../newproject.module.css";
import React, { useState } from "react";

export default function Direcciondelproyecto() {
    const [provincia, setProvincia] = useState(null);
    const [canton, setCanton] = useState(null);
    const [eleccion, setEleccion] = useState(null);  // Estado para almacenar el ID del cantón seleccionado

    const datos = [
        {
            "provincias": [
                {
                    "id": 1,
                    "nombre": "San José",
                    "cantones": [
                        {
                            "id": 1,
                            "nombre": "Central",
                            "distritos": [
                                "Carmen",
                                "Merced",
                                "Hospital",
                                "Catedral",
                                "Zapote",
                                "San Francisco De Dos Ríos",
                                "Uruca",
                                "Mata Redonda",
                                "Pavas",
                                "Hatillo",
                                "San Sebastián"
                            ]
                        },
                        {
                            "id": 2,
                            "nombre": "Escazú",
                            "distritos": [
                                "Escazú",
                                "San Antonio",
                                "San Rafael"
                            ]
                        }
                    ]
                },
                {
                    "id": 2,
                    "nombre": "Heredia",
                    "cantones": [
                        {
                            "id": 1,
                            "nombre": "Central",
                            "distritos": [
                                "Heredia",
                                "Mercedes",
                                "San Francisco",
                                "Ulloa",
                                "Varablanca"
                            ]
                        },
                        {
                            "id": 2,
                            "nombre": "Barva",
                            "distritos": [
                                "Barva",
                                "San Pedro",
                                "San Pablo",
                                "San Roque",
                                "Santa Lucía",
                                "San José de la Montaña"
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    const handleCanton = (e) => {
        setCanton(e.target.value);
        const cantonSeleccionado = datos[0].provincias.find(p => p.nombre === provincia)?.cantones.find(c => c.nombre === e.target.value);
        setEleccion(cantonSeleccionado ? cantonSeleccionado.id : null);
    };

    const handleProvincia = (e) => {
        setProvincia(e.target.value);
        setCanton(null);  // Restablecer el cantón seleccionado cuando cambie la provincia
        setEleccion(null); // Restablecer la elección del cantón
    };

    return (
        <>
            <div className={style.datoscontainer1}>
                <h1 className={style.titulocontainer1}>Nuevo caso - Dirección del proyecto</h1>

                {/* Select de Provincia */}
                <select className={style.selecttipo1} name="Provincia" id="" onChange={handleProvincia}>
                    <option value="">Seleccione una provincia</option>
                    {
                        datos[0].provincias.map((prov) => (
                            <option key={prov.id} value={prov.nombre}>
                                {prov.nombre}
                            </option>
                        ))
                    }
                </select>

                {/* Select de Cantones */}
                <select className={style.selecttipo1} name="Cantones" id="" onChange={handleCanton} disabled={!provincia}>
                    <option value="">Seleccione un cantón</option>
                    {
                        provincia && datos[0].provincias.find(p => p.nombre === provincia)?.cantones.map((canton1) => (
                            <option key={canton1.id} value={canton1.nombre}>
                                {canton1.nombre}
                            </option>
                        ))
                    }
                </select>

                {/* Select de Distritos */}
                <select className={style.selecttipo1} name="Distrito" id="" disabled={!canton || !provincia}>
                    <option value="">Seleccione un distrito</option>
                    {
                        eleccion && datos[0].provincias.find(p => p.nombre === provincia)?.cantones.find(c => c.id === eleccion)?.distritos.map((distrito1, id) => (
                            <option key={id} value={distrito1}>{distrito1}</option>
                        ))
                    }
                </select>
            </div>
        </>
    );
}
