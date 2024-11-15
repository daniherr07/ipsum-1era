'use client'

import { TagPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { useState } from 'react';

function useUsers(defaultUsers = []){
  const [users, setUsers] = useState(defaultUsers);
  const [loading, setLoading] = useState(false);
  const featUsers = word => {
    setLoading(true);
    fetch(`https://ipsum-backend.vercel.app/test/${word}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
        console.log(data)
      })
      .catch(e => console.log('Oops, error', e));
  };

  return [users, loading, featUsers];
};

export default function App() {
  const [users, loading, featUsers] = useUsers();
  const [value, setValue] = useState([]);
  const [cacheData, setCacheData] = useState([]);

  const handleSelect = (value, item, event) => {
    setCacheData([...cacheData, item]);
  };

  return (
    <TagPicker
      data={users}
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
  );
};