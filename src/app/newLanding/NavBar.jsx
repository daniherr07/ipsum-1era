'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <form action="/api/toLogin" method="POST">
            <button type="submit" className={styles.logoButton}>
              <Image
                src="/landing/ipsumBlanco.svg"
                alt="Logo"
                width={36}
                height={36}
                className={styles.logoImage}
              />
            </button>
          </form>
        </div>

        {/* Desktop Menu */}
        <div className={styles.navLinks}>
          <Link href="/landing" className={styles.navLink}>Inicio</Link>
          <Link href="#mision" className={styles.navLink}>Sobre Nosotros</Link>
          <Link href="#proyectos" className={styles.navLink}>Proyectos</Link>
          <Link href="#contactos" className={styles.navLink}>Contactos</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 'X' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/landing" className={styles.mobileNavLink}>Inicio</Link>
          <Link href="#mision" className={styles.mobileNavLink}>Sobre Nosotros</Link>
          <Link href="#proyectos" className={styles.mobileNavLink}>Proyectos</Link>
          <Link href="#contactos" className={styles.mobileNavLink}>Contactos</Link>
        </div>
      )}
    </nav>
  )
}

