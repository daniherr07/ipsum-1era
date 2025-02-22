'use client'

import { useEffect, useState } from 'react';
import { TagPicker } from 'rsuite';
import Image from 'next/image';
import { data } from './data';
import 'rsuite/dist/rsuite-no-reset.min.css';
import style from './search.module.css';
import {useRouter}  from 'next/navigation';
import { useFetchBackend } from '@/hooks/useFetchApi';
import { handleChange } from '@/utils/handleChange';

export default function SearchInputs() {
    const router = useRouter()
    const [selectedValue, setSelectedValue] = useState('');
    const [tagData, setTagData] = useState([]);
    const [etapasSelect, setEtapasSelect] = useState([])
    const [bonosSelect, setBonosSelect] = useState([])

    const [etapas, setEtapas] = useState()
    const [bonos, setBonos] = useState()
    const [pickerValue, setPickerValue] = useState([]);

    const handleSelectChange = async (event) => {
        setPickerValue([])
        const value = event.target.value;
        setSelectedValue(value);

        if (value) {
            let selectedItem = data.find(item => item.value === value);
            let table = selectedItem.table;
            let hasRoleId = selectedItem.rol_id ? true : false;
            let isDisabled = selectedItem.label == "Eliminados" ? true: false
            
            try {
                let url = `filter?table=${table}&nombre=${selectedItem.nombre}`;
                if (table == "proyectos" && isDisabled) {
                    url += `&activated=0`
                } else if(table == "proyectos" && !isDisabled) {
                    url += `&activated=1`
                }
                if (hasRoleId) {
                    url += `&rol_id=${selectedItem.rol_id}`;
                }
                const result = await useFetchBackend(url, "GET");
                setTagData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const loadEtapasData = async () => {
        let url = `filter?table=etapas&nombre=nombre`;
        const result = await useFetchBackend(url, "GET");
        setEtapas(result);
    }

    const loadBonos = async () => {
        let url = `filter?table=tipos_bono&nombre=nombre`;
        const result = await useFetchBackend(url, "GET");
        setBonos(result);
        
    }

    const handleEtapasChange = (value) => {
        setEtapasSelect(value);
    };

    const handleBonosChange = (value) => {
        setBonosSelect(value);
    };

    const handleTagChange = (value) => {
        setPickerValue(value);
    };

    const handleSubmit = () => {

        let url = `/protected/search?`
        if (pickerValue.length != 0) {
            url += `&label=${selectedValue}&value=${pickerValue.join(',')}`
            let selectedItem = data.find(item => item.value === selectedValue);
            let isDisabled = selectedItem.label == "Eliminados" ? true: false

            if (isDisabled) {
                url += `&isDisabled=0`
            } else {
                url += `&isDisabled=1`
            }
        }

        if (etapasSelect.length > 0) {
           url += `&etapa_id=${etapasSelect.join(",")}`
        }

        if (bonosSelect.length > 0) {
            console.log(bonosSelect.join(","))
            url += `&tipo_bono_id=${bonosSelect.join(",")}`
        }



        
        router.push(url);
    };

    useEffect(() => {
        const loadAllData = async () => {
            await loadEtapasData()
            await loadBonos()
        }

        loadAllData()

    }, [])

    return (
        <div className={style.inputs}>

            <div className={style.tagPickers}>

                <label htmlFor="etapa">Seleccionar Etapa</label>
                <TagPicker
                    disabled={!etapas}
                    data={etapas}
                    className={style.inputText}
                    labelKey='nombre'
                    valueKey='id'
                    value={etapasSelect}
                    onChange={handleEtapasChange}
                    placeholder="Seleccionar Etapas"
                />


                <label htmlFor="bonos">Seleccionar Bonos</label>
                <TagPicker
                    disabled={!bonos}
                    data={bonos}
                    className={style.inputText}
                    labelKey='nombre'
                    valueKey='id'
                    value={bonosSelect}
                    onChange={handleBonosChange}
                    placeholder="Seleccionar Bonos"
                />


                


                <label htmlFor="otros">Seleccionar Otros</label>
                <select 
                    name='otros' 
                    className={style.inputText} 
                    onChange={handleSelectChange}
                    value={selectedValue}
                >
                    <option value="">Buscar...</option>
                    {data.map(item => (
                        <option key={item.id} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <TagPicker
                    disabled={!selectedValue}
                    data={tagData}
                    className={style.inputText}
                    labelKey='nombre'
                    valueKey='id'
                    value={pickerValue}
                    onChange={handleTagChange}
                />

            </div>

            <button type='button' onClick={handleSubmit} className={style.buscarBtn}>
                Buscar

                <Image 
                src="/lupa.svg" 
                width={30} 
                height={30} 
                alt='lupa' 
                className={style.itemLupa} 
                />
            </button>

        </div>
    );
}

