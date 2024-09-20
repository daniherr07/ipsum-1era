import Image from 'next/image';
import style from './navbar.module.css'
import SelectPicker from './components/SelectPicker';
import Accordion from '../Accordion';
import { Suspense } from 'react';



export default function NavBar({logo = true, searchBar = true}){
    return(
        <>
        <Accordion searchBar={searchBar}></Accordion>

        <nav className={style.nav}>

            <div className={style.col1}>
                <Image 
                src={'logo.svg'} 
                width={90} 
                height={40} 
                className={style.logo} 
                style={logo == true ? null : {display: "none"}}/>

                <form action="/api/search" method='POST' className={style.searchBar} style={
                    searchBar == true ? null : {display: "none"}
                }>
                    <Suspense>
                        <SelectPicker></SelectPicker>
                    </Suspense>

                    
                    <button type="submit" style={{background: "none", border: "none"}} className={style.lupaContainer}>
                        <Image src={'lupa.svg'} width={20} height={20}  className={style.lupa}/>
                    </button>
                </form>
            </div>

            <div className={style.col2}>
                <p className={style.username}>Steven Corrales</p>
                <Image src={'person.svg'} width={20} height={20} className={style.person} />
                
            </div>





        </nav>
        </>
    );
}