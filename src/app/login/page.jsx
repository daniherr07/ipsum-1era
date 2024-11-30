'use client'

import Image from 'next/image'
import style from './login.module.css'
import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search(){
  const showErrorToast = useCallback(() => {
    toast.error("Hubo un error: Usuario o contraseña incorrectos", {
        toastId: 'loginError', // Unique ID for this toast
    });
}, []);
  const searchParams = useSearchParams()
  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
        showErrorToast();
    }
}, [searchParams, showErrorToast]);

return (<ToastContainer />)
}

export default function Login() {

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

            if (result.toChange) {
                router.push('/newUser');
            } else if (result.toHome) {
                router.push(`/protected/home`);
            } else if (result.toError) {
                if (searchParams.get('error')) {
                    // If we're already on the error URL, show the toast directly
                    showErrorToast();
                } else {
                    // Otherwise, change the URL which will trigger the useEffect
                    router.push('/login?error=Usuario%20o%20contraseña%20incorrectos');
                }
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
              <Search></Search>
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
                        onChange={handleChange} 
                        value={formData.user}
                        required
                    />

                    <label htmlFor="psw" className={style.label}>Contraseña</label>
                    <input 
                        type="password" 
                        name="psw" 
                        id="pswForm" 
                        className={style.pswForm}
                        onChange={handleChange} 
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