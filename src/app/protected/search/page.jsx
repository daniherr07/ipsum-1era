import NavBar from "../components/Navbar";
import MainSearch from "./components/MainSearch";
import style from './search.module.css'
import { Suspense } from 'react'

export default async function Search({searchParams}){
    const searchWaited = await searchParams;
    const searchLabel = await searchWaited.label;
    const searchValue = await searchWaited.value;

    return(
        <>
            <NavBar></NavBar>

            <Suspense>
            <main className={style.main}>

                <MainSearch label={searchLabel} value={searchValue}></MainSearch>
            </main>
            </Suspense>
        </>
    );
}