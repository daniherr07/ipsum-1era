
import NavBar from "../components/navbar/Navbar";
import style from "./userList.module.css"
import { Suspense } from "react";



export default function UserList(){



    return(
        <>
        <Suspense>
            <NavBar />
        </Suspense>
        </>
    );
}