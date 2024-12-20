'use client'
import Image from 'next/image';
import style from './navbar.module.css'
import Accordion from './Accordion';
import { useProtectedContext } from '@/app/context/ProtectedContext';




export default function NavBar({logo = true}){
    const userData = useProtectedContext();
    return(
        <div className={style.navContainer}>
            <Accordion userData={userData}/>

            <nav className={style.nav}>
                <div className={style.col1}>
                    <form action="/api/home" method='POST' className={style.searchBar} style={logo == true ? null : {display: "none"}}>  
                        <button type="submit" style={{background: "none", border: "none"}} className={style.logoContainer}>
                                <Image src={'/logo.svg'} width={90} height={40} className={style.logo} alt='logo' />
                        </button>
                    </form>
                </div>

                <div className={style.col2}>
                    <p className={style.username}>{userData.userName}</p>
                    <Image src={'/person.svg'} width={20} height={20} className={style.person} alt='person'/>
                </div>
            </nav>
        </div>
    );
}