

import { Suspense } from 'react';
import NavBar from '../../components/Navbar';
import SideBar from './components/SideBar';
import { address } from '@/app/const';

import style from "./newproject.module.css";

export default async function NewProject({params}) {
  const res = await fetch(`${address}/getProjectDetails/${params.id}`)
  const dataOld = await res.json()
  console.log(dataOld)
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
      </Suspense>
      
      <main className={style.main}>
        <SideBar projectDataOld={dataOld[0][0]} familyMembersOld={dataOld[1]} directionDataOld={dataOld[2]} formDataAdminOld={dataOld[3][0]}/>
        

      </main>
    </>
  );
}