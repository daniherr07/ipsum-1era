import Image from 'next/image';
import style from './navbar.module.css'
import SelectPicker from './components/SelectPicker';
import Accordion from '../Accordion';
import { Suspense } from 'react';
import { cookies } from 'next/headers'



export default async function NavBar({logo = true, searchBar = true}){
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('auth')
    const userData = JSON.parse(authCookie.value)

    return(
        <div className={style.navContainer}>
        <Accordion searchBar={searchBar} userData={userData}></Accordion>

        <nav className={style.nav}>

            <div className={style.col1}>

                <form action="/api/search" method='POST' className={style.searchBar} style={logo == true ? null : {display: "none"}}>  
                    <button type="submit" style={{background: "none", border: "none"}} className={style.logoContainer}>
                            <Image src={'/logo.svg'} width={90} height={40} className={style.logo} alt='logo' />
                    </button>
                </form>
                

                <form action="/api/search" method='POST' className={style.searchBar} style={
                    searchBar == true ? null : {display: "none"}
                }>
                    <Suspense>
                        <SelectPicker></SelectPicker>
                    </Suspense>

                    
                    <button type="submit" style={{background: "none", border: "none"}} className={style.lupaContainer}>
                        <Image src={'/lupa.svg'} width={20} height={20}  className={style.lupa} alt='lupa'/>
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