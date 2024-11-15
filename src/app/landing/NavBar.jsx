import Link from "next/link"
import Image from "next/image"
import styles from './page.module.css'

export default function NavBar(){
    return(
        <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navInner}>
            <div>
            <form action="/api/toLogin" method='POST'>
                <button type="submit" style={{background: "none", border: "none"}}>
                  <Image
                    src="/landing/ipsumBlanco.svg"
                    alt="Logo"
                    width={36}
                    height={36}
                    
                  />
                </button>
            </form>
              
            </div>
            <div className={styles.navLinks}>
              <Link href="/landing" className={styles.navLink}>Inicio</Link>
              <Link href="#mision" className={styles.navLink}>Sobre Nosotros</Link>
              <Link href="#proyectos" className={styles.navLink}>Proyectos</Link>
              <Link href="#contactos" className={styles.navLink}>Contactos</Link>
            </div>
          </div>
        </div>
      </nav>
    )
}