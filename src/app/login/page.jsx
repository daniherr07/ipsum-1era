'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import style from './login.module.css'

export default function Login(){
    const router = useRouter();
    const handleSubmit = (event) => {
        event.preventDefault()
        router.push(`/home`);
    }

    return(
        <>
        <div className={style.body}>
            <main className={style.main}>
                <Image src={'logo.svg'} width={20} height={20}  className={style.logo}/>
                <form action="" className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="idForm" className={style.label}>ID</label>
                    <input type="text" name="idForm" className={style.idForm} id="idForm"/>

                    <label htmlFor="pswForm" className={style.label}>Contraseña</label>
                    <input type="password" name="pswForm" id="pswForm" className={style.pswForm} />

                    <p className={style.forget}>¿Olvidó la contraseña?</p>
                    <button className={style.submit} type='submit' >Iniciar Sesion</button>
                </form>
                
            </main>
        </div>
        </>
    )
}