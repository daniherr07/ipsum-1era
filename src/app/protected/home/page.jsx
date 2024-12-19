
import style from './page.module.css'
import Image from 'next/image';
import NavBar from '../components/navbar/Navbar';
import { Suspense } from 'react';
import SearchInputs from '../components/SearchInputs';




export default async function Home() {






    return(
        <>
        <Suspense>
            <NavBar/>
        </Suspense>
        

        
        <main className={style.main}>
           
            
           <Image src={'/logo.svg'} width={90} height={40} className={style.logo} priority={true} alt='logo'/>

           <div className={style.searchContainer}>
            <SearchInputs></SearchInputs>
           </div>
            

            
        </main>
        </>
        
    );
    
}