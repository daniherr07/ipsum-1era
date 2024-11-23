'use client'

import { TagPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { useState } from 'react';
import style from '../navbar.module.css'
import { address } from '@/app/const';

const useData = () => {
  const [storedData, setStoredData] = useState();
  const [loading, setLoading] = useState(false);
  const featUsers = word => {
    setLoading(true);
    fetch(`${address}/test/${word}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setStoredData(data);
        setLoading(false);
      })
      .catch(e => console.log('Oops, error', e));
  };

  return [storedData, loading, featUsers];
};

export default function App () {
  const [storedData, loading, featUsers] = useData();
  const [value, setValue] = useState([]);
  const [cacheData, setCacheData] = useState([]);

  const handleSelect = (value, item, event) => {
    setCacheData([...cacheData, item]);
  };

  return (
    <div style={{display:"flex"}}>
    <TagPicker
      data={storedData}
      cacheData={cacheData}
      value={value}
      labelKey="formatted_value"
      valueKey="id"
      className={style.inputText}
      onChange={setValue}
      onSearch={featUsers}
      onSelect={handleSelect}
      renderMenu={menu => {
        if (loading) {
          return (
            <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
              <SpinnerIcon spin /> Loading...
            </p>
          );
        }
        return menu;
      }}
    />
    </div>
  );
};