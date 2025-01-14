'use client'

import Image from 'next/image'
import style from './login.module.css'
import { handleChange } from '@/utils/handleChange'
import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { ErrorToast } from './ErrorToast'
import { useFetchBackend } from '@/hooks/useFetchApi'



export default function ForgetPassword() {

    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
    
        try {
            const result = await useFetchBackend("forgetPassword", "POST", formData)
            console.log(result);

            if (result.noUser) {
                console.log("no hay correo")
                toast.error("No hay usuario conectado a este correo electronico")
            } else{
                console.log("si hubo correo")
                toast.success("Por favor revisar correo electronico para la nueva contraseña", {
                    onClose: ()=> router.push("/login")
                })
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

                    <label htmlFor="email" className={style.label}>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        className={style.idForm}
                        id="email" 
                        onChange={e => handleChange(e, setFormData)} 
                        value={formData.email}
                        required
                    />

                    <button className={style.submit} type='submit'>Enviar correo</button>
                </form>
            </main>
        </div>
    )
}