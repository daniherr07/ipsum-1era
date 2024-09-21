import NavBar from "../components/navbar/Navbar";
import MainSearch from "./components/MainSearch";
import style from './search.module.css'
import { Suspense } from 'react'

export default function Search(){


    return(
        <>
            <Suspense>
                <NavBar></NavBar>
            </Suspense>

            <main className={style.main}>
                <Suspense>
                    <MainSearch></MainSearch>
                </Suspense>
                

            </main>
        </>
    );
}