'use client'

import { TagPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { useState } from 'react';

const useData = () => {
  const [storedData, setStoredData] = useState();
  const [loading, setLoading] = useState(false);
  const featUsers = word => {
    setLoading(true);
    fetch(`https://ipsum-backend.vercel.app/test/${word}`)
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
      style={{ width: 300 }}
      labelKey="formatted_value"
      valueKey="id"
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

    <p>Esto esta hecho con una base de datos real!</p>
    </div>
  );
};
