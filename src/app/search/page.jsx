import NavBar from "../components/navbar/Navbar";
import MainSearch from "./components/MainSearch";
import style from './search.module.css'


export default function Search(){


    return(
        <>
            <NavBar></NavBar>
            <main className={style.main}>
                <MainSearch></MainSearch>

            </main>
        </>

    );
}