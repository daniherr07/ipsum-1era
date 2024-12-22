'use client'

import { useEffect, useState } from 'react';
import styles from './datos-administrativos.module.css';
import { useFetchBackend } from '@/hooks/useFetchApi';

export default function DatosAdministrativos({formData, setFormData}) {
    const [data, setData] = useState({
        Entidad: [],
        Analista_Ipsum: [],
        Analista_de_Entidades: [],
        Promotor_de_Entidades: [],
        Fiscal: [],
        Ingeniero: [],
        Promotor_Ipsum: [],
    });
    const [centrosNegocio, setCentrosNegocio] = useState([]);
    const [analistasEntidad, setAnalistasEntidad] = useState([]);
    const [promotoresEntidad, setPromotoresEntidad] = useState([]);


    useEffect(() => {
       useFetchBackend("getAdminData", "GET")
            .then((fetchedData) => {
                setData(fetchedData);
            })
            .catch((error) => console.error('Error fetching admin data:', error));
    }, []);

    useEffect(() => {
        if (formData.entidad) {
            updateCentrosNegocio(formData.entidad);
            updateAnalistasYPromotores(formData.entidad);
        }
    }, [formData.entidad, data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'entidad') {
            setFormData(prevState => ({
                ...prevState,
                entidadSecundaria: '',
                analistaEntidad: '',
                promotorEntidad: ''
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

    const updateAnalistasYPromotores = (entidadId) => {
        const entidadSeleccionada = data.Entidad.find(e => e.localId == entidadId);
        const analistasCoincidentes = data.Analista_de_Entidades.filter(
            analista => analista.Entidad == entidadSeleccionada.Nombre
        );
        setAnalistasEntidad(analistasCoincidentes);

        const promotoresCoincidentes = data.Promotor_de_Entidades.filter(
            promotor => promotor.Entidad == entidadSeleccionada.Nombre
        );
        setPromotoresEntidad(promotoresCoincidentes);
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
                                        {item.Nombre}
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
                                        {centro.nombre}
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
                                        {`${analista.Nombre} ${analista.Apellido_1} ${analista.Apellido_2}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Promotor Entidad</label>
                            <select
                                name="promotorEntidad"
                                value={formData.promotorEntidad}
                                onChange={handleInputChange}
                                className={styles.select}
                                disabled={!formData.entidad}
                            >
                                <option value="">Seleccione un promotor</option>
                                <option value="pendiente">Pendiente</option>
                                {promotoresEntidad.map((promotor, key) => (
                                    <option key={key} value={promotor.localID}>
                                        {`${promotor.Nombre} ${promotor.Apellido_1} ${promotor.Apellido_2}`}
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
                                {data.Promotor_Ipsum.map((promotor, key) => (
                                    <option key={key} value={promotor.localID}>
                                        {`${promotor.Nombre} ${promotor.Apellido_1} ${promotor.Apellido_2}`}
                                    </option>
                                ))}
                                <option value="">+ Añadir uno nuevo</option>
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
                                        {`${promotor.Nombre} ${promotor.Apellido_1} ${promotor.Apellido_2}`}
                                    </option>
                                ))}
                                <option value="">+ Añadir un Analista</option>
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
                                        {`${fiscal.Nombre} ${fiscal.Apellido_1} ${fiscal.Apellido_2}`}
                                    </option>
                                ))}
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
                                {data.Ingeniero.map((promotor, key) => (
                                    <option key={key} value={promotor.localID}>
                                        {`${promotor.Nombre} ${promotor.Apellido_1} ${promotor.Apellido_2}`}
                                    </option>
                                ))}
                                <option value="0">+ Añadir un Ingeniero</option>
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

