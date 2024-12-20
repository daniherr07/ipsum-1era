

import { Suspense } from 'react';
import NavBar from '../components/Navbar';
import SideBar from './components/SideBar';

import style from "./newproject.module.css";

export default function NewProject() {

  return (
    <>
      <NavBar />
      <main className={style.main}>
        <SideBar />
      </main>
    </>
  );
}