'use client'

import Image from 'next/image'
import style from './login.module.css'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

function Search() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
   
    return <>{error && <p style={{ color: 'red' }}>Hubo un error: {error}</p>}</>
  }

export default function Login(){
    const router = useRouter()

    const [formData, setFormData] = useState({
        user: '',
        email: '',
        psw: '',
        psw2: ''
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
    
          const response = await fetch('/api/changePassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
          console.log(result);

          
          if (result.pswError) {
            router.push('/newUser?error=Las_contraseñas_no_coinciden');
          }

          if (result.userError) {
            router.push('/newUser?error=Usuario_incorrecto');
          }

          if (result.emailError) {
            router.push('/newUser?error=Email_incorrecto');
          }

          if (result.toLogin){
            router.push('/login?newUser=true')
          }
      };

    return(
        <>
        
            <div className={style.body}>
                <main className={style.main}>
                    <Image src={'logo.svg'} width={20} height={20}  className={style.logo} alt='logo'/>
                    <h1>Por favor cambie su contraseña</h1>
                    <Suspense>
                    <Search></Search>
                    </Suspense>
                    <form className={style.form} onSubmit={handleSubmit} >
                        <label htmlFor="user" className={style.label}>ID</label>
                        <input type="text" name="user" className={style.idForm} id="idForm" onChange={handleChange} required/>

                        <label htmlFor="email" className={style.label}>Email</label>
                        <input type="text" name="email" className={style.idForm} id="idForm" onChange={handleChange} required/>

                        <label htmlFor="psw" className={style.label}>Contraseña</label>
                        <input type="password" name="psw" id="pswForm" className={style.pswForm} onChange={handleChange} required/>

                        <label htmlFor="psw2" className={style.label}> Confirmar Contraseña</label>
                        <input type="password" name="psw2" id="pswForm" className={style.pswForm} onChange={handleChange} required/>
                        <button className={style.submit} type='submit' >Actualizar Contraseña</button>
                    </form>
                    
                </main>
            </div>
        </>
    )
}