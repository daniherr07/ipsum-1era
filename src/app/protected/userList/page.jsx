import NavBar from "../components/navbar/Navbar";
import styles from './styles/page.module.css'
import { Suspense } from "react";
import UserRow from './components/UserRow'
import { address } from "@/app/const";


  export default async function Page() {
    const res = await fetch(`${address}/getUsers`)
    const users = await res.json()

    console.log(users)
  
    return (
        <>
        <Suspense>
            <NavBar />
        </Suspense>


      <div className={styles.container}>
        <h1 className={styles.title}>Lista de usuarios</h1>
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
                <UserRow key={user.id} user={user} />
                ))}
            </Suspense>

          </tbody>
        </table>

        <button type="button" className={styles.addButton}>Agregar usuario nuevo</button>
      </div>
      </>
    )
  }