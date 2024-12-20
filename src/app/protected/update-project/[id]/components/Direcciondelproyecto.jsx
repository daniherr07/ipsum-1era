'use client'

import styles from "./location-form.module.css";
import { handleChange } from '@/utils/handleChange';

export default function DireccionDelProyecto({directionData, setDirectionData}) {
    console.log(directionData)

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

    const handleInputChange = (e) => {
        const { name } = e.target;
        handleChange(e, setDirectionData);

        // Reset dependent fields
        if (name === "provincia") {
            setDirectionData(prevState => ({
                ...prevState,
                canton: "",
                distrito: ""
            }));
        } else if (name === "canton") {
            setDirectionData(prevState => ({
                ...prevState,
                distrito: ""
            }));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Editar - Dirección del Proyecto</h1>
            </div>

            <div className={styles.formContent}>
                <div className={styles.locationSelects}>
                    <div className={styles.selectGroup}>
                        <label>Provincia</label>
                        <select
                            className={styles.select}
                            name="provincia"
                            value={directionData.provincia}
                            onChange={handleInputChange}
                        >
                            <option value={directionData.provincia}>{directionData.provincia}</option>
                            {datos[0].provincias.map((prov) => (
                                <option key={prov.id} value={prov.nombre}>
                                    {prov.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.selectGroup}>
                        <label>Cantón</label>
                        <select
                            className={styles.select}
                            name="canton"
                            value={directionData.canton}
                            onChange={handleInputChange}
                            disabled={!directionData.provincia}
                        >
                            <option value={directionData.canton}>{directionData.canton}</option>
                            {directionData.provincia &&
                                datos[0].provincias
                                    .find((p) => p.nombre === directionData.provincia)
                                    ?.cantones.map((canton) => (
                                        <option key={canton.id} value={canton.nombre}>
                                            {canton.nombre}
                                        </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.selectGroup}>
                        <label>Distrito</label>
                        <select
                            className={styles.select}
                            name="distrito"
                            value={directionData.distrito}
                            onChange={handleInputChange}
                            disabled={!directionData.canton}
                        >
                            <option value={directionData.distrito}>{directionData.distrito}</option>
                            {directionData.canton &&
                                datos[0].provincias
                                    .find((p) => p.nombre === directionData.provincia)
                                    ?.cantones.find((c) => c.nombre === directionData.canton)
                                    ?.distritos.map((distrito, index) => (
                                        <option key={index} value={distrito}>
                                            {distrito}
                                        </option>
                                    ))}
                        </select>
                    </div>
                </div>

                <div className={styles.addressGroup}>
                    <label>Otras señas:</label>
                    <textarea
                        className={styles.textarea}
                        name="otrasSenas"
                        value={directionData.otrasSenas}
                        onChange={handleInputChange}
                        placeholder="Del higuerón antiguo, 200 metros norte, en la esquina"
                    />
                </div>

                <div className={styles.locationSelects}>
                    <div className={styles.selectGroup}>
                        <label>Tipo de identificacion</label>
                        <select
                            className={styles.select}
                            name="loteTipoIdentificacion"
                            value={directionData.loteTipoIdentificacion}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccione un Tipo</option>
                            <option value="1">Persona Fisica</option>
                            <option value="2">Persona Juridica</option>
                        </select>
                    </div>

                    <div className={styles.selectGroup}>
                        <label>Numero de Identifiacion</label>

                        <input className={styles.select} 
                        type="number" value={directionData.loteIdentificacion} 
                        name="loteIdentificacion" onChange={handleInputChange} 
                        placeholder="000000000000000"
                        required/>
                    </div>

                </div>


                <div className={styles.cadastralGroup}>
                    <div className={styles.uploadSection}>
                        <button className={styles.uploadButton}>
                            Cargar Plano ↑
                        </button>
                    </div>
                    
                    <div className={styles.cadastralNumber}>
                        <label>Número de Plano Catastro</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="numeroPlanoCatastro"
                            value={directionData.numeroPlanoCatastro}
                            onChange={handleInputChange}
                            placeholder="PC-2024-303033"
                        />
                    </div>

                    <div className={styles.cadastralNumber}>
                        <label>Número de Finca</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="finca"
                            value={directionData.finca}
                            onChange={handleInputChange}
                            placeholder="F002"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

