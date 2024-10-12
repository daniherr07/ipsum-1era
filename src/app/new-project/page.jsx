'use client'
import NavBar from '../components/navbar/Navbar';
import { useState } from 'react';
import Datosdelproyecto from '../new-project/components/Datosdelproyecto';
import style from "../new-project/newproject.module.css"
import Image from 'next/image';
import Miembrosdelafamilia from './components/Miembrosdelafamilia';
import Direcciondelproyecto from './components/Direcciondelproyecto';
import Datosadministrativos from './components/Datosadministrativos';
import { Suspense } from 'react';
export default function newproject(){
    const [page, setPage] = useState(0);

    function showDatosDelProyecto() {
        setPage(1);
    }
    function showMiembrosDeLaFamilia() {
        setPage(2);
    }
    function showDireccionDelProyecto() {
        setPage(3);
    }
    function showDatosAdministrativos() {
        setPage(4);
    }

    const tipos_bonos = [
        {
        "id": 0,
        "nombre": "Construccion en lote propio",
        "subtipos":[
                "Bono ordinario",
                "Bono crédito",
                "Adulto mayor",
                "Discapacidad"

        ]
        },
        {
            "id": 1,
            "nombre": "RAMT",
            "subtipos":[
                    "Bono ordinario",
                    "Bono crédito",
                    "Adulto mayor",
                    "Discapacidad"
    
            ]
        },

]

    return(
        <>
        <Suspense>
            <NavBar></NavBar>
        </Suspense>
        
        <main className={style.main}>
        <>
            <aside className={style.accordioncontainer}>
                <ul>
                    <li className={style.itemleft}>
                        <div className={style.optionleft} onClick={showDatosDelProyecto}>Datos del proyecto</div>
                        <Image src={'arrow.svg'} width={20} height={10} className={style.arrow} />
                    </li>
                    <li className={style.itemleft}>
                        <div className={style.optionleft} onClick={showMiembrosDeLaFamilia}>Miembros de la familia</div>
                        <Image src={'arrow.svg'} width={20} height={10} className={style.arrow} />
                    </li>
                    <li className={style.itemleft}>
                        <div className={style.optionleft} onClick={showDireccionDelProyecto}>Direccion del proyecto</div>
                        <Image src={'arrow.svg'} width={20} height={10} className={style.arrow} />
                    </li>
                    <li className={style.itemleft}>
                        <div className={style.optionleft} onClick={showDatosAdministrativos}>Datos administrativos</div>
                        <Image src={'arrow.svg'} width={20} height={10} className={style.arrow} />
                    </li>
                </ul>
            </aside>
        </>


        
        {page === 1 && <Datosdelproyecto />}
        {page === 2 && <Miembrosdelafamilia />}
        {page === 3 && <Direcciondelproyecto />}
        {page === 4 && <Datosadministrativos />}
        </main>
        
        
        </>
    )
}