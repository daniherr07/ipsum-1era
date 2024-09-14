import Image from 'next/image';
import style from './navbar.module.css'
import SelectPicker from './components/SelectPicker';



export default function NavBar(){

    return(
        <>
        <nav className={style.nav}>

            <div className={style.col1}>
                <Image src={'logo.svg'} width={90} height={40} className={style.logo} />

                <form action="/api/search" method='POST' className={style.searchBar}>
                    <SelectPicker></SelectPicker>
                    
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <Image src={'lupa.svg'} width={20} height={20}  className={style.lupa}/>
                    </button>
                </form>
            </div>

            <div className={style.col2}>
                <p className={style.username}>Steven Corrales</p>
                <Image src={'person.svg'} width={20} height={20} className={style.person} />
                <Image src={'hamburger.svg'} width={20} height={20} className={style.ham} />
            </div>



        </nav>
        </>
    );
}