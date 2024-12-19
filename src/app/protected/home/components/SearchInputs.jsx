'use client'

import { useState } from 'react';
import { TagPicker } from 'rsuite';
import Image from 'next/image';
import { data } from './data';
import { address } from '@/app/const';
import 'rsuite/dist/rsuite-no-reset.min.css';
import style from '../page.module.css';
import {useRouter}  from 'next/navigation';

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
            
            try {
                let url = `${address}/filter?table=${table}&nombre=${selectedItem.nombre}`;
                if (hasRoleId) {
                    url += `&rol_id=${selectedItem.rol_id}`;
                }
                const response = await fetch(url);
                const result = await response.json();
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
        router.push(`/protected/search?label=${selectedValue}&value=${pickerValue.join(',')}`);
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
                    <option key={item.value} value={item.value}>{item.label}</option>
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

