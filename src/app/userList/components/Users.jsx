'use client'

import Image from "next/image";
import { useState } from "react";
import style from '../userList.module.css'



export default function Users({setDeletePopup, setUpdatePopup, setSelectedItem }){
    const [active, setActive] = useState();

    const names = [
        {
            "id": 0,
            "name": "Francisco",
            "firstLastName" : "Montoña",
            "secondLastName" : "Perez",
            "roles":[
                {
                    "id": 0,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                },
            ]
        },
        {
            "id": 1,
            "name": "Carlos",
            "firstLastName" : "Ramirez",
            "secondLastName" : "Gomez",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
            ]
        },
        {
            "id": 2,
            "name": "María",
            "firstLastName" : "Lopez",
            "secondLastName" : "Fernandez",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        },
        {
            "id": 3,
            "name": "Ana",
            "firstLastName" : "Rodriguez",
            "secondLastName" : "Castro",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        },
        {
            "id": 4,
            "name": "Jorge",
            "firstLastName" : "Vargas",
            "secondLastName" : "Solis",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        },
        {
            "id": 5,
            "name": "Sofía",
            "firstLastName" : "Martinez",
            "secondLastName" : "Soto",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        },
        {
            "id": 6,
            "name": "Luis",
            "firstLastName" : "Gonzalez",
            "secondLastName" : "Morales",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        },
        {
            "id": 7,
            "name": "Gabriela",
            "firstLastName" : "Mendez",
            "secondLastName" : "Herrera",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        },
        {
            "id": 8,
            "name": "Pedro",
            "firstLastName" : "Jimenez",
            "secondLastName" : "Torres",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        },
        {
            "id": 9,
            "name": "Isabel",
            "firstLastName" : "Navarro",
            "secondLastName" : "Rojas",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        },
        {
            "id": 10,
            "name": "Ricardo",
            "firstLastName" : "Santamaria",
            "secondLastName" : "Vega",
            "roles":[
                {
                    "id": 0,
                    "name": "Administrador",
                    "color": "#FFA6A6"
                },
                {
                    "id": 1,
                    "name": "Ingeniero",
                    "color": "#9DD6FF"
                }
            ]
        }
    ]
    return(
        <>
        <tbody className={style.tbody}>
        {
        names.map((item, index) => (
            <tr key={item.id} className={style.tr}>
                <td className={style.tbodyText}>{item.firstLastName}</td>
                <td className={style.tbodyText}>{item.secondLastName}</td>
                <td className={style.tbodyText}>{item.name}</td>
                <td className={style.tbodyEdit} >
                    <Image className={style.tbodyImage} src={"arrowRight.svg"} width={10} height={10} onClick={() => setActive(index)}/>


                    <div className={style.rolePopup} style={index == active ? {display: "flex"} : {display: "none"}} >

                        <h3 >Roles</h3>

                        <div className={style.rolesContainer}>
                            {
                            item.roles.map(role => (
                                <p key={role.id} className={style.role} style={{backgroundColor: `${role.color}`}} >{role.name}</p>
                            ))
                            }
                        </div>

                        <div className={style.roleIcons}>
                            <Image 
                            src={"pen.svg"} 
                            width={20} 
                            height={20} 
                            onClick={() => 
                                {setUpdatePopup(true); 
                                setSelectedItem(item)}} />

                            <Image 
                            src={"delete.svg"} 
                            width={20} 
                            height={20} 
                            onClick={() => 
                                {setDeletePopup(true); // Open the delete popup
                                setSelectedItem(item)}} />
                        </div>

                    </div>

                </td>
            </tr>
            ))}
        </tbody>
        
        </>
        
        
        


    )
}