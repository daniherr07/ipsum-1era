import NavBar from '../../components/Navbar';
import SideBar from './components/SideBar';
import style from "./newproject.module.css";
import { useFetchBackend } from '@/hooks/useFetchApi';

export default async function NewProject({params}) {
  const waitedParams = await params;
  const dataOld = await useFetchBackend(`getProjectDetails/${waitedParams.id}`, "GET")
  return (
    <>
      <NavBar />
      <main className={style.main}>
        <SideBar projectDataOld={dataOld[0][0]} familyMembersOld={dataOld[1]} directionDataOld={dataOld[2]} formDataAdminOld={dataOld[3][0]}/>
      </main>
    </>
  );
}