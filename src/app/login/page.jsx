'use client'

import Image from 'next/image'
import style from './login.module.css'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

function Search() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const newUserModal = searchParams.get('newUser')
   
    return (
        <>
        {error && <p style={{ color: 'red' }}>Hubo un error: {error}</p>}
        {newUserModal && <p style={{ color: 'green' }}>Contraseña cambiada exitosamente</p>}
        </>
    )
}

export default function Login(){
    const router = useRouter()


    const [formData, setFormData] = useState({
        user: '',
        psw: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
          console.log(result);

          if (result.toChange) {
            router.push('/newUser');
          }

          if (result.toHome) {
            router.push(`/protected/home?user=${result.user}`);
          }

          if (result.toError){
            router.push('/login?error=authentication_failed')
          }
      };

    return(
        <>
        
            <div className={style.body}>
                <main className={style.main}>
                    <Image src={'logo.svg'} width={20} height={20}  className={style.logo} alt='logo'/>\
                    <Suspense>
                        <Search></Search>
                    </Suspense>
                    <form className={style.form} onSubmit={handleSubmit} >
                        <label htmlFor="user" className={style.label}>ID</label>
                        <input type="text" name="user" className={style.idForm} id="idForm" onChange={handleChange} required/>

                        <label htmlFor="psw" className={style.label}>Contraseña</label>
                        <input type="password" name="psw" id="pswForm" className={style.pswForm} onChange={handleChange} required/>

                        <p className={style.forget}>¿Olvidó la contraseña?</p>
                        <button className={style.submit} type='submit' >Iniciar Sesion</button>
                    </form>
                    
                </main>
            </div>
        </>
    )
}