

export function handleChange (event, setterFunction) {
    const { name, value, type, checked } = event.target;
    setterFunction(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
};