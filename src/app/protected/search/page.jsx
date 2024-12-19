import NavBar from "../components/navbar/Navbar";
import MainSearch from "./components/MainSearch";
import style from './search.module.css'
import { Suspense } from 'react'

export default function Search({searchParams}){
    console.log('Search params:', searchParams.label)

    return(
        <>
            <Suspense>
                <NavBar></NavBar>
            </Suspense>

            <Suspense>
            <main className={style.main}>

                <MainSearch label={searchParams.label} value={searchParams.value}></MainSearch>
            </main>
            </Suspense>
        </>
    );
}