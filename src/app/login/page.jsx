'use client'

import Image from 'next/image'
import style from './login.module.css'
import { handleChange } from '@/utils/handleChange'
import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

import { ErrorToast } from './ErrorToast'



export default function Login() {

    const router = useRouter()
    const [formData, setFormData] = useState({
        user: '',
        psw: '',
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            console.log(result);

            if (result.deactivated) {
                return toast.error("Usuario desactivado, por favor activarlo antes de iniciar sesión")
            }

            if (result.toChange) {
                router.push('/newUser');
            } else if (result.toHome) {
                router.push(`/protected/home`);
            } else if (result.toError) {
                toast.error("Error: Usuario o contraseña incorrectos");
            } else {
                toast.error("Ocurrió un error inesperado");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Error: Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className={style.body}>
            
            <Suspense>
              <ErrorToast></ErrorToast>
            </Suspense>
            <main className={style.main}>
                <Image src={'/logo.svg'} width={200} height={100} className={style.logo} alt='logo'/>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="user" className={style.label}>ID</label>
                    <input 
                        type="text" 
                        name="user" 
                        className={style.idForm}
                        id="idForm" 
                        onChange={e => handleChange(e, setFormData)} 
                        value={formData.user}
                        required
                    />

                    <label htmlFor="psw" className={style.label}>Contraseña</label>
                    <input 
                        type="password" 
                        name="psw" 
                        id="pswForm" 
                        className={style.pswForm}
                        onChange={e => handleChange(e, setFormData)} 
                        value={formData.psw}
                        required
                    />

                    <p className={style.forget}>¿Olvidó la contraseña?</p>
                    <button className={style.submit} type='submit'>Iniciar Sesión</button>
                </form>
            </main>
        </div>
    )
}