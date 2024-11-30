'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollToContactos = (e) => {
    e.preventDefault()
    const servicesSection = document.getElementById('contactos')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
  const scrollToFilosofia = (e) => {
    e.preventDefault()
    const servicesSection = document.getElementById('filosofia')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  const scrollToProyectos = (e) => {
    e.preventDefault()
    const servicesSection = document.getElementById('proyectos')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

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
          <Link href="/" className={styles.navLink}>Inicio</Link>
          <Link href="#filosofia" className={styles.navLink} onClick={scrollToFilosofia}>Sobre Nosotros</Link>
          <Link href="#proyectos" className={styles.navLink} onClick={scrollToProyectos}>Proyectos</Link>
          <Link href="#contactos" className={styles.navLink} onClick={scrollToContactos}>Contactos</Link>
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
          <Link href="#inicio" className={styles.mobileNavLink} onClick={scrollToInicio}>Inicio</Link>
          <Link href="#filosofia" className={styles.mobileNavLink} onClick={scrollToFilosofia}>Sobre Nosotros</Link>
          <Link href="#proyectos" className={styles.mobileNavLink} onClick={scrollToProyectos}>Proyectos</Link>
          <Link href="#contactos" className={styles.mobileNavLink} onClick={scrollToContactos}>Contactos</Link>
        </div>
      )}
    </nav>
  )
}

