import style from './page.module.css'
import Image from 'next/image';
import { TagPicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import NavBar from '../components/navbar/Navbar';



export default function Home() {

    const data = ['Bono: Articulo 59', 'Bono: CLP', 'Entidad: Mutual', 'Entidad: Mucap'].map(
        item => ({ label: item, value: item })
    );


    return(
        <>
        <NavBar logo={false} searchBar={false}/>
        <main className={style.main}>
           
            
           <Image src={'logo.svg'} width={90} height={40} className={style.logo} priority={true}/>
            

            <form action="/api/search" method='POST' className={style.searchBar}>
                <TagPicker data={data} name='tags' className={style.inputText} placeholder='Buscar...'/>    
                
                <button type="submit" style={{background: "none", border: "none"}}>
                    <Image src={'lupa.svg'} width={20} height={20}  className={style.lupa}/>
                </button>
            </form>
            
        </main>
        </>
        
    );
    
}