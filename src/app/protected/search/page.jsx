import NavBar from "../components/Navbar";
import MainSearch from "./components/MainSearch";
import style from './search.module.css'
import { Suspense } from 'react'

export default async function Search({searchParams}){
    const searchWaited = await searchParams;
    const searchLabel = await searchWaited.label;
    const searchValue = await searchWaited.value;
    const isDisabled = await searchWaited.isDisabled;
    const etapa_id = await searchWaited.etapa_id;
    const tipo_bono_id = await searchWaited.tipo_bono_id;

    console.log(etapa_id)
    console.log(tipo_bono_id)

    return(
        <>
            <NavBar></NavBar>

            <Suspense>
            <main className={style.main}>

                <MainSearch label={searchLabel} value={searchValue} isDisabled={isDisabled} etapa_id={etapa_id} tipo_bono_id={tipo_bono_id}></MainSearch>
            </main>

            </Suspense>
        </>
    );
}