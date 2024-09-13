import Image from 'next/image';
import style from './navbar.module.css'
import { TagPicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';


export default function NavBar(){
    const data = ['Articulo 59', 'CLP', 'Mutual', 'Mucap'].map(
        item => ({ label: item, value: item })
        );
    return(
        <>
        <nav className={style.nav}>

            <div className={style.col1}>
                <Image src={'logo.svg'} width={90} height={40} className={style.logo} />

                <div className={style.searchBar}>
                    <TagPicker data={data} className={style.inputText} placeholder='Buscar...'/>    
                    <Image src={'lupa.svg'} width={20} height={20} className={style.lupa} />
                </div>
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