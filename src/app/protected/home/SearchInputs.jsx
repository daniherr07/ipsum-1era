'use client'

import { useState } from 'react';
import { TagPicker } from 'rsuite';
import Image from 'next/image';
import { data } from './data';
import 'rsuite/dist/rsuite-no-reset.min.css';
import style from './search.module.css';
import {useRouter}  from 'next/navigation';
import { useFetchBackend } from '@/hooks/useFetchApi';

export default function SearchInputs() {
    const router = useRouter()
    const [selectedValue, setSelectedValue] = useState('');
    const [tagData, setTagData] = useState([]);
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
                console.log(url)
                const result = await useFetchBackend(url, "GET");
                setTagData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const handleTagChange = (value) => {
        setPickerValue(value);
    };

    const handleSubmit = () => {
        let url = `/protected/search?label=${selectedValue}&value=${pickerValue.join(',')}`
        let selectedItem = data.find(item => item.value === selectedValue);
        let isDisabled = selectedItem.label == "Eliminados" ? true: false
        console.log("Is disabled en handle submit", isDisabled)

        if (isDisabled) {
            url += `&isDisabled=0`
        } else {
            url += `&isDisabled=1`
        }
        
        router.push(url);
    };

    return (
        <div className={style.inputs}>
            <select 
                name='tags' 
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

            <Image 
                src="/lupa.svg" 
                width={30} 
                height={30} 
                alt='lupa' 
                className={style.itemLupa} 
                onClick={handleSubmit}
            />
        </div>
    );
}

