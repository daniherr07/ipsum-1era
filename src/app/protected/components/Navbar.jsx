'use client'
import Image from 'next/image';
import style from './navbar.module.css'
import Accordion from './Accordion';
import { useProtectedContext } from '@/app/context/ProtectedContext';
import { useEffect, useState } from 'react';
import { useFetchBackend } from '@/hooks/useFetchApi';
import { useRouter } from 'next/navigation';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { confirmAlert } from 'react-confirm-alert';



export default function NavBar({logo = true}){
    const userData = useProtectedContext();
    const [notisSinLeer, setNotisSinLeer] = useState([])
    const [allNotis, setAllNotis] = useState([])
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(true)
    const router = useRouter()
    const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });



    const handleReturn = () => {
        router.back()
    }

    const getAllNotis = async () => {
        await useFetchBackend(`getAllNotis?user_id=${userData.id}`, "GET")
        .then(notisData => {setAllNotis(notisData)})
        .catch(error => console.log(error))
    }

    const setReaded = async (id) => {
        await useFetchBackend(`setReaded`, "POST", {id})
        .then(() => {getAllNotis(); setUpdate(!update)})
        .catch(error => console.log(error))
    }

    
    const setAllReaded = async () => {
        await useFetchBackend(`setAllReaded`, "POST", {id: userData.id})
        .then(() => {getAllNotis(); setUpdate(!update)})
        .catch(error => console.log(error))
    }

    const deleteReaded = async (id) => {
        await useFetchBackend(`deleteReaded`, "POST", {id: userData.id})
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
            <Accordion></Accordion>

            <nav className={style.nav}>
                <div className={style.col1}>
                    <p onClick={handleReturn} className={style.atrasButton}> &lt; Atrás </p>
                </div>

                <div className={style.col2}>
                    <p className={style.username}>{userData.userName}</p>
                    <Image src={'/person.svg'} width={20} height={20} className={style.person} alt='person'/>

                    <div className={style.bellContainer} onClick={getAllNotis} ref={ref}>
                        <Image src={'/bell-solid.svg'} width={35} height={30} className={style.bellIcon} alt='person' onClick={() => setOpen(!open)} />

                        {
                            (notisSinLeer && notisSinLeer.length > 0) &&
                            <p className={style.notificationsNumber}>{notisSinLeer.length}</p>
                        }
                        

                        {
                            open ?
                            <div className={style.floatingBox}>
                                
                                <div className={style.footerNotification}>
                                    <p className={style.notisButton} onClick={setAllReaded}>Leer todos</p>
                                    <p className={style.notisButton} onClick={deleteReaded}>Borrar leídos</p>
                                </div>
                                {
                                    (allNotis && allNotis.length > 0)
                                    ?
                                        <div className={style.notisContent}>
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
                                    <p style={{textAlign: "center"}}>Sin notificaciones </p>

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

