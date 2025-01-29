'use client'

import { useEffect, useState } from 'react';
import styles from './datos-administrativos.module.css';
import { useFetchBackend } from '@/hooks/useFetchApi';
import { useRouter } from 'next/navigation';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { AddSomething } from '../../../components/Accordion';

export default function DatosAdministrativos({formData, setFormData}) {
    const router = useRouter()
    const [data, setData] = useState({
        Entidad: [],
        Analista_Ipsum: [],
        Analista_de_Entidades: [],
        Arquitecto: [],
        Fiscal: [],
        Ingeniero: [],
        Promotor_Ipsum: [],
        Constructor: [],
    });
    const [centrosNegocio, setCentrosNegocio] = useState([]);
    const [analistasEntidad, setAnalistasEntidad] = useState([]);
    const [arquitecto, setArquitectos] = useState([]);

    const [update, setUpdate] = useState(false)

    const addSomethingFunction = (enterTo = "Analista") => {
        confirmAlert({
            customUI: ({ onClose }) => <AddSomething onClose={() => {onClose(), setUpdate(!update)}} router={router} enterTo={enterTo} />,
        })
    }


    useEffect(() => {
       useFetchBackend("getAdminData", "GET")
            .then((fetchedData) => {
                console.log(fetchedData)
                setData(fetchedData);
                setArquitectos(fetchedData.Arquitecto);
            })
            .catch((error) => console.error('Error fetching admin data:', error));
    }, [update]);

    useEffect(() => {
        if (formData.entidad) {
            updateCentrosNegocio(formData.entidad);
            updateAnalistas(formData.entidad);
        }
    }, [formData.entidad, data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;


        if (value == "" || value == "otro") {
            switch (name) {
                case "fiscalAsignado":
                    addSomethingFunction("Fiscal")
                    break;
                case "entidad":
                    addSomethingFunction("Entidad")
                    break;
                case "entidadSecundaria":
                    addSomethingFunction("CentroNegocio")
                    break;
                case "constructor":
                    addSomethingFunction("Constructor")
                    break;
                case "Promotor_Ipsum":
                    addSomethingFunction("Promotor")
                    break;

                case "analistaEntidad":
                    addSomethingFunction("Analista")
                    break;
                default:
                    
                    break;
            }
            
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'entidad') {
            setFormData(prevState => ({
                ...prevState,
                entidadSecundaria: '',
                analistaEntidad: '',
            }));
        }
    };

    const updateCentrosNegocio = (entidadId) => {
        const entidadSeleccionada = data.Entidad.find(e => e.localId == entidadId);
        if (entidadSeleccionada) {
            setCentrosNegocio(entidadSeleccionada.Centros_de_Negocio || []);
        } else {
            setCentrosNegocio([]);
        }
    };

    const updateAnalistas = (entidadId) => {
        const entidadSeleccionada = data.Entidad.find(e => e.localId == entidadId);
        if (entidadSeleccionada != undefined) {
            const analistasCoincidentes = data.Analista_de_Entidades.filter(
                analista => analista.Entidad == entidadSeleccionada.Nombre
            );

            setAnalistasEntidad(analistasCoincidentes);

            
        }
    };

    return (

        
        <div className={styles.container}>
            {data && 
            <>
            <div className={styles.header}>
                <h1 className={styles.title}>Editar - Datos Administrativos</h1>
            </div>

            <div className={styles.formContent}>
                <div className={styles.formGrid}>
                    {/* Left Column */}
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Entidad</label>
                            <select
                                name="entidad"
                                value={formData.entidad}
                                onChange={handleInputChange}
                                className={styles.select}
                            >
                                <option value="">Seleccione una entidad</option>
                                {data.Entidad.map((item, key) => (
                                    <option key={key} value={item.localId}>
                                        {item.Nombre} {item.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                                <option value="otro">+ Agregar Otra Entidad</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Centro de Negocio</label>
                            <select
                                name="entidadSecundaria"
                                value={formData.entidadSecundaria}
                                onChange={handleInputChange}
                                className={styles.select}
                                disabled={!formData.entidad}
                            >
                                <option value="">Seleccione un centro de negocio</option>
                                <option value="pendiente">
                                        Pendiente
                                </option>
                                {centrosNegocio.map((centro, key) => (
                                    <option key={key} value={centro.localId}>
                                        {centro.nombre} {centro.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                                <option value="otro">+ Agregar Otro Centro de Negocio</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>APC</label>
                                <input
                                    type="text"
                                    name="apc"
                                    value={formData.apc}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder='123456'
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>CFIA</label>
                                <input
                                    type="text"
                                    name="cfia"
                                    value={formData.cfia}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder='OC-123456'
                                />
                            </div>


                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Constructor</label>
                            <select
                                name="constructor"
                                value={formData.constructor}
                                onChange={handleInputChange}
                                className={styles.select}
                            >
                                <option value="">Seleccione un constructor</option>
                                <option value="pendiente">
                                        Pendiente
                                </option>
                                {data.Constructor.map((item, key) => (
                                    <option key={key} value={item.localId}>
                                        {`${item.Nombre} ${item.Apellido_1} ${item.Apellido_2}`} {item.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                                <option value="otro">+ Agregar Otro Constructor</option>
                            </select>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className={styles.column}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Analista Entidad</label>
                            <select
                                name="analistaEntidad"
                                value={formData.analistaEntidad}
                                onChange={handleInputChange}
                                className={styles.select}
                                disabled={!formData.entidad}
                            >
                                <option value="">Seleccione un analista</option>
                                <option value="pendiente">Pendiente</option>
                                {analistasEntidad.map((analista, key) => (
                                    <option key={key} value={analista.localID}>
                                        {`${analista.Nombre} ${analista.Apellido_1} ${analista.Apellido_2}`} {analista.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                                <option value="otro">+ Agregar Otro Analista</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Arquitecto</label>
                            <select
                                name="arquitecto"
                                value={formData.arquitecto}
                                onChange={handleInputChange}
                                className={styles.select}
                            >
                                <option value="">Seleccione un arquitecto</option>
                                <option value="pendiente">Pendiente</option>
                                {arquitecto && arquitecto.map((arquitecto, key) => (
                                    <option key={key} value={arquitecto.localID}>
                                        {`${arquitecto.Nombre} ${arquitecto.Apellido_1} ${arquitecto.Apellido_2}`} {arquitecto.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Promotor Ipsum</label>
                            <select
                                name="Promotor_Ipsum"
                                value={formData.Promotor_Ipsum}
                                onChange={handleInputChange}
                                className={styles.select}
                            >
                                <option value="">Seleccione un promotor</option>
                                <option value="pendiente">
                                        Pendiente
                                </option>
                                {data.Promotor_Ipsum.map((promotor, key) => (
                                    <option key={key} value={promotor.localID}>
                                        {`${promotor.Nombre} ${promotor.Apellido_1} ${promotor.Apellido_2}`} {promotor.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                                <option value="otro">+ Agregar Otra Entidad</option>

                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Analista IPSUM</label>
                            <select
                                name="analistaIPSUM"
                                value={formData.analistaIPSUM}
                                onChange={handleInputChange}
                                className={styles.select}
                            >
                                <option value="">Seleccione un Analista Ipsum</option>
                                {data.Analista_Ipsum.map((promotor, key) => (
                                    <option key={key} value={promotor.localID}>
                                        {`${promotor.Nombre} ${promotor.Apellido_1} ${promotor.Apellido_2}`} {promotor.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Fiscal Asignado</label>
                            <select
                                name="fiscalAsignado"
                                value={formData.fiscalAsignado}
                                onChange={handleInputChange}
                                className={styles.select}
                            >
                                <option value="">Seleccione un fiscal</option>
                                <option value="pendiente">Pendiente</option>
                                {data.Fiscal.map((fiscal, key) => (
                                    <option key={key} value={fiscal.localID}>
                                        {`${fiscal.Nombre} ${fiscal.Apellido_1} ${fiscal.Apellido_2}`} {fiscal.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                                <option value="otro">+ Agregar Otro Fiscal</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.column}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Presupuesto</label>
                                <input
                                    type="text"
                                    name="presupuesto"
                                    value={formData.presupuesto}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder='9 200 0000'
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Avalúo</label>
                                <input
                                    type="text"
                                    name="avaluo"
                                    value={formData.avaluo}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder='7 200 0000'
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Ingeniero asignado</label>
                            <select
                                name="ingenieroAsignado"
                                value={formData.ingenieroAsignado}
                                onChange={handleInputChange}
                                className={styles.select}
                            >
                                <option value="">Seleccione un Ingeniero</option>
                                <option value="pendiente">
                                        Pendiente
                                </option>
                                {data.Ingeniero.map((promotor, key) => (
                                    <option key={key} value={promotor.localID}>
                                        {`${promotor.Nombre} ${promotor.Apellido_1} ${promotor.Apellido_2}`} {promotor.activated == 0 && "(Desactivado)"}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            </>
            
            
            
            }
            
        </div>
    );
}

