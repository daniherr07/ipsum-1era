
import style from './page.module.css'
import Image from 'next/image';
import NavBar from '../components/Navbar';
import SearchInputs from './SearchInputs';




export default function Home() {

    return(
        <>
        <NavBar/>
        <main className={style.main}>
           <Image src={'/logo.svg'} width={90} height={40} className={style.logo} priority={true} alt='logo'/>
           <div className={style.searchContainer}>
            <SearchInputs></SearchInputs>
           </div>
        </main>
        </>
    );
    
}