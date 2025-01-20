'use client'
import Image from 'next/image';
import style from './navbar.module.css'
import Accordion from './Accordion';
import { useProtectedContext } from '@/app/context/ProtectedContext';
import { useEffect, useState } from 'react';
import { useFetchBackend } from '@/hooks/useFetchApi';




export default function NavBar({logo = true}){
    const userData = useProtectedContext();
    const [notisSinLeer, setNotisSinLeer] = useState([])
    const [allNotis, setAllNotis] = useState([])
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(true)

    const getAllNotis = async () => {
        await useFetchBackend(`getAllNotis?user_id=${userData.id}`, "GET")
        .then(notisData => {setAllNotis(notisData)})
        .catch(error => console.log(error))

        
    }

    const setReaded = async (id) => {
        await useFetchBackend(`setReaded`, "POST", {id: id})
        .then(() => {getAllNotis(); setUpdate(!update)})
        .catch(error => console.log(error))
    }

    useEffect( ()=> {
        const  getNotiData = async () => {
            await useFetchBackend(`getNotisLeidas?user_id=${userData.id}`, "GET")
            .then(notisData => setNotisSinLeer(notisData))
            .catch(error => console.log(error))
        }

        getNotiData()
    }, [update])

    return(
        <div className={style.navContainer}>
            <Accordion userData={userData}/>

            <nav className={style.nav}>
                <div className={style.col1}>
                    <form action="/api/home" method='POST' className={style.searchBar} style={logo == true ? null : {display: "none"}}>  
                        <button type="submit" style={{background: "none", border: "none"}} className={style.logoContainer}>
                                <Image src={'/logo.svg'} width={90} height={40} className={style.logo} alt='logo' />
                        </button>
                    </form>
                </div>

                <div className={style.col2}>
                    <p className={style.username}>{userData.userName}</p>
                    <Image src={'/person.svg'} width={20} height={20} className={style.person} alt='person'/>

                    <div className={style.bellContainer} onClick={getAllNotis}>
                        <Image src={'/bell-solid.svg'} width={35} height={30} className={style.bellIcon} alt='person' onClick={() => setOpen(!open)} />
                        <p className={style.notificationsNumber}>{notisSinLeer && notisSinLeer.length}</p>

                        {
                            open ?
                            <div className={style.floatingBox}>

                                {
                                    notisSinLeer &&
                                    notisSinLeer.map(noti => (
                                        <div className={style.noti} key={noti.id} onClick={() => setReaded(noti.id)} style={{cursor: "pointer"}}>
                                            <p className={style.notiText}>{noti.message}</p>
                                            <div className={style.redCircle}></div>
                                        </div>
                                    ))
                                }

                                
                                {
                                    allNotis &&
                                    allNotis.map(noti => (
                                        noti.leido == 1 &&
                                        <div className={style.noti} key={noti.id}>
                                            <p className={style.notiText}>{noti.message}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            null
                        }


                           

                    </div>


                    
                </div>
            </nav>
        </div>
    );
}