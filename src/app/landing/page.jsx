'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react'
import styles from './page.module.css'

export default function IpsumConstruction() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const projects = [
    {
      image: '/landing/img2.jpg?height=600&width=800',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis ultrices nisi et convallis. Phasellus iaculis vehicula eros.'
    },
    {
      image: '/landing/img1.jpg?height=600&width=800',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      image: '/landing/img3.jpg?height=600&width=800',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div>
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
              <Link href="#inicio" className={styles.navLink}>Inicio</Link>
              <Link href="#mision" className={styles.navLink}>Misión</Link>
              <Link href="#vision" className={styles.navLink}>Visión</Link>
              <Link href="#proyectos" className={styles.navLink}>Proyectos</Link>
              <Link href="#contactos" className={styles.navLink}>Contactos</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <Image
              src="/landing/logo.svg"
              alt="IPSUM Logo"
              width={800}
              height={300}
              className={styles.heroLogo}
            />
            <p className={styles.heroText}>
              En Ipsum, nos dedicamos a construir un mejor futuro para las familias costarricenses a través de soluciones habitacionales de alta calidad. Con años de experiencia en la construcción de viviendas de interés social y proyectos de bonos de vivienda, nuestro compromiso es ofrecer hogares seguros, cómodos y accesibles que eleven la calidad de vida de cada uno de nuestros beneficiarios.
            </p>
            <p className={styles.heroText}>
              Nuestro equipo está conformado por profesionales apasionados por el bienestar social y la sostenibilidad, lo que nos permite ejecutar proyectos con los más altos estándares de calidad, cumpliendo rigurosamente con las normativas nacionales e internacionales. En Ipsum, entendemos que una vivienda no es solo un lugar donde vivir, sino un espacio donde las familias pueden crecer, soñar y construir su futuro.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.missionVisionSection}>
        <div className={styles.container}>
          <div className={styles.missionVisionGrid}>
            <div style={{display:"flex", flexDirection: "column", placeContent: "center", placeItems: "center", gap: "1em"}}>
              <h2 className={styles.missionVisionTitle}>Misión</h2>
              <Image
                src="/landing/mision.jpg"
                alt="Mision illustration"
                width={300}
                height={300}
                className={styles.missionVisionImage}
              />
              <p className={styles.missionVisionText}>
                Brindar soluciones habitacionales accesibles y de calidad que mejoren la calidad de vida de las familias costarricenses, mediante la construcción de viviendas de bien social y bonos de vivienda, comprometidos con la sostenibilidad, el respeto al entorno y la dignidad de cada hogar.
              </p>
            </div>
            <div style={{display:"flex", flexDirection: "column", placeContent: "center", placeItems: "center", gap: "1em"}}>
              <h2 className={styles.missionVisionTitle}>Visión</h2>
              <Image
                src="/landing/vision.png"
                alt="Vision illustration"
                width={300}
                height={300}
                className={styles.missionVisionImage}
              />
              <p className={styles.missionVisionText}>
                Ser la empresa líder en construcción de viviendas sociales en Costa Rica, reconocida por nuestra excelencia en el diseño, calidad y accesibilidad de nuestras soluciones habitacionales, y por contribuir al desarrollo de comunidades inclusivas y sostenibles, donde cada familia tenga la oportunidad de un hogar seguro y digno.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <h2 className={styles.projectsTitle}>Proyectos</h2>
          <div className={styles.projectsCarousel}>
            <button
              onClick={prevSlide}
              className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
              aria-label="Previous project"
            >
              <ChevronLeft />
            </button>
            <div className={styles.carouselImage}>
              <Image
                src={projects[currentSlide].image}
                alt={`Project ${currentSlide + 1}`}
                fill
                style={{objectFit: 'cover'}}
              />
              <div className={styles.carouselCaption}>
                <p className={styles.carouselCaptionText}>{projects[currentSlide].description}</p>
              </div>
            </div>
            <button
              onClick={nextSlide}
              className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
              aria-label="Next project"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2 className={styles.contactTitle}>Contáctanos</h2>
          <div className={styles.contactGrid}>
            <div style={{width: "100%"}}>
              <h3 className={styles.contactFormTitle}>Escribenos</h3>
              <form className={styles.contactForm}>
                <input
                  type="text"
                  placeholder="Nombre"
                  className={styles.formInput}
                  required
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  className={styles.formInput}
                  required
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className={styles.formInput}
                  required
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className={styles.formInput}
                  required
                />
                <textarea
                  placeholder="Mensaje"
                  rows={5}
                  className={styles.formTextarea}
                  required
                />
                <button
                  type="submit"
                  className={styles.formSubmitButton}
                  style={{display:"flex", flexDirection: "row", placeContent: "center", placeItems: "center", gap: "1em"}}
                >
                  Enviar consulta
                  <Mail />
                </button>
              </form>
            </div>
            <div>
              <h3 className={styles.contactInfoTitle}>Información de contacto</h3>
              <div>
                <div className={styles.contactInfoItem}>
                  <Phone />
                  <span>+506 4035-7370</span>
                </div>
                <div className={styles.contactInfoItem}>
                  <Mail />
                  <span>info@ipsum.com</span>
                </div>
                <div className={styles.contactInfoItem}>
                  <MapPin />
                  <span>Moravia, San José</span>
                </div>
                <Link
                  href="https://wa.me/+50688082269"
                  className={styles.whatsappButton}
                  style={{display:"flex", flexDirection: "row", placeContent: "center", placeItems: "center", gap: "1em"}}
                >
                  <span>¡Escribenos al Whatsapp!</span>
                  <Image src="landing/wasap.svg" width={40} height={40} alt='logo wasap'/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}