import NavBar from "../components/navbar/Navbar";
import styles from './styles/page.module.css'
import { Suspense } from "react";
import UserRow from './components/UserRow'
import { address } from "@/app/const";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from "./components/AddUser";


  export default async function Page() {
    const res = await fetch(`${address}/getUsers`)
    const users = await res.json()

    return (
        <>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Suspense>
            <NavBar />
        </Suspense>


      <div className={styles.container}>
        <h1 className={styles.title}>Lista de usuarios</h1>


        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.headerCell}>Primer apellido</th>
                <th className={styles.headerCell}>Segundo apellido</th>
                <th className={styles.headerCell}>Nombre</th>
                <th className={styles.headerCell}>Rol</th>
                <th className={styles.headerCell}>Editar</th>
                <th className={styles.headerCell}>Desactivar</th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={<p>Loading...</p>}>
                  {users && users.map(user => (
                    <>
                  <UserRow key={user.id} user={user} />

                  </>
                  
                  ))}
              </Suspense>

            </tbody>
          </table>
        </div>
        <AddUser></AddUser>
        
      </div>
      </>
    )
  }