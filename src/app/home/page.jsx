'use client'
import { useRouter } from 'next/navigation';

import style from './page.module.css'
import Image from 'next/image';
import { TagPicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';


export default function Home() {
    const router = useRouter();
    const handleSubmit = () => {
        console.log("llego")
        router.push(`/search`);
    }

    const data = ['Articulo 59', 'CLP', 'Mutual', 'Mucap'].map(
        item => ({ label: item, value: item })
    );


    return(
        <main className={style.main}>
           
            <Image src={'logo.svg'} width={90} height={40} className={style.logo} />
            
            

            <div className={style.searchBar}>
                <TagPicker data={data} className={style.inputText} placeholder='Buscar...'/>    
                <Image src={'lupa.svg'} width={20} height={20} className={style.lupa} onClick={handleSubmit}/>
            </div>

            <div className={style.misc}>
                <div className={style.user}>
                    <p className={style.username}>Steven</p>
                    <Image src={'person.svg'} width={20} height={20} className={style.person} />
                </div>
                <Image src={'hamburger.svg'} width={45} height={45} className={style.ham}></Image>
            </div>
            
        </main>
    );
    
}