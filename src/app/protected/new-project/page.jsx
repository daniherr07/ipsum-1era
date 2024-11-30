

import { Suspense } from 'react';
import NavBar from '../components/navbar/Navbar';
import SideBar from './components/SideBar';

import style from "./newproject.module.css";

export default function NewProject() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
      </Suspense>
      
      <main className={style.main}>
        <SideBar />
        

      </main>
    </>
  );
}