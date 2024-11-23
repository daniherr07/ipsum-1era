'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Footer from './Footer'
import NavBar from './NavBar'
import WhatsAppButton from './WhatsAppButton'
import styles from './page.module.css'



export default function IpsumConstruction() {
  const servicios = [
    {
      titulo: 'Bonos de vivienda',
      icono: <img src="/landing/Home.svg" alt="Light blue building with wooden door" className={styles.icono} loading="lazy" decoding="async"/>,
      alineacion: 'izquierda'
    },
    {
      titulo: 'Instalaciones especializadas',
      icono: <img src="/landing/Rayo.svg" alt="Light blue building with wooden door" className={styles.icono} loading="lazy" decoding="async"/>,
      alineacion: 'derecha'
    },
    {
      titulo: 'Reformas y remodelaciones',
      icono: <img src="/landing/Grua.svg" alt="Light blue building with wooden door" className={styles.icono} loading="lazy" decoding="async"/>,
      alineacion: 'izquierda'
    },
    {
      titulo: 'Obras civiles',
      icono: <img src="/landing/Puente.svg" alt="Light blue building with wooden door" className={styles.icono} loading="lazy" decoding="async"/>,
      alineacion: 'derecha'
    }
  ]

  return (
    <>
      <NavBar></NavBar>

      <header className={styles.container} id='inicio'>
      <div className={styles.videoBack}>
        <video autoPlay muted preload="auto" loop className={styles.bgVideo}>
          <source src="/landing/bgVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.heroContent}>
          <Image
            src="/landing/logo.svg"
            alt="IPSUM Logo"
            width={800}
            height={300}
            className={styles.heroLogo}
          />

          <p className={styles.heroText}>
            Somos una empresa constructora con amplia experiencia y compromiso en el desarrollo de soluciones habitacionales y de infraestructura. Nos especializamos en diseñar y construir proyectos que van desde viviendas personalizadas hasta obras funcionales y comerciales, adaptándonos a las necesidades específicas de cada cliente.
          </p>

          <button className={styles.heroButton}>
            ¡Comienza hoy mismo!
          </button>
        </div>
      </div>
    </header>

      <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Transformando la vida<br />
          de los costarricenses
        </h2>
        <p className={styles.description}>
          En IPSUM, entendemos que cada proyecto es único. Nos
          enorgullece ofrecer un servicio integral que responde a
          las necesidades y expectativas de nuestros clientes, ya
          sea en proyectos pequeños, medianos o de mayor
          alcance. Con nuestra experiencia y compromiso,
          hacemos realidad cualquier visión constructiva, siempre
          con la calidad y responsabilidad que nos caracteriza.
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/landing/ingenieros.png"
          alt="Constructores profesionales"
          className={styles.image}
          fill
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 613px"
          priority
        />
      </div>
    </section>

    <section className={styles.seccionProyectos}>
  <h1 className={styles.tituloProyectos}>Nuestros proyectos</h1>
  <div className={styles.galeriaProyectos}>
    <div className={styles.columnaIzquierdaProyectos}>
      <div className={styles.filaArribaProyectos}>
        <div className={styles.imagenPequenaProyectos}>
          <div className={styles.imageContainer}>
            <img 
              src="/landing/casa1.webp" 
              alt="White residential building with ramp"
              className={styles.imagenProyectos}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.overlay}>
              <span className={styles.projectTitle}>Proyecto 1</span>
            </div>
          </div>
        </div>
        <div className={styles.imagenPequenaProyectos}>
          <div className={styles.imageContainer}>
            <img 
              src="/landing/casa2.webp" 
              alt="Gray building with wooden door"
              className={styles.imagenProyectos}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.overlay}>
              <span className={styles.projectTitle}>Proyecto 2</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imagenMedianaProyectos}>
        <div className={styles.imageContainer}>
          <img 
            src="/landing/casa3.webp" 
            alt="Blue building with ramp and walkway"
            className={styles.imagenProyectos}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.overlay}>
            <span className={styles.projectTitle}>Proyecto 3</span>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.columnaDerechaProyectos}>
      <div className={styles.imagenGrandeProyectos}>
        <div className={styles.imageContainer}>
          <img 
            src="/landing/casa4.webp" 
            alt="Light blue building with wooden door"
            className={styles.imagenProyectos}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.overlay}>
            <span className={styles.projectTitle}>Proyecto 4</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



    <section className={styles.seccionServicios}>
      <h2 className={styles.tituloServicios}>Servicios</h2>
      <div className={styles.listaServicios}>
        {servicios.map((servicio, index) => (
          <div 
            key={index} 
            className={`${styles.itemServicio} ${servicio.alineacion === 'derecha' ? styles.itemServicioDerecha : ''} ${styles.parahover}`}
          >
            <div className={`${styles.contenedorIcono} `}>
              {servicio.icono}
            </div>
            <div className={`${styles.textoServicio}`}>
              {servicio.titulo}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.seccionFilosofia}>
      <div className={styles.contenedorMision}>
      <img 
          src="/landing/Flag.svg" 
          alt="Bandera" 
          loading="lazy"
          decoding="async"
          className={styles.iconoMision}
      />
        <h2 className={styles.tituloMision}>Misión</h2>
        <p className={styles.textoMision}>
          Brindar soluciones habitacionales accesibles y de calidad 
          que mejoren la calidad de vida de las familias 
          costarricenses, mediante la construcción de viviendas de 
          bien social y bonos de vivienda, comprometidos con la 
          sostenibilidad, el respeto al entorno y la 
          dignidad de cada hogar.
        </p>
      </div>
      <div className={styles.contenedorVision}>
      <img 
          src="/landing/Eye.svg" 
          alt="Bandera" 
          loading="lazy"
          decoding="async"
          className={styles.iconoMision}
      />
        <h2 className={styles.tituloVision}>Visión</h2>
        <p className={styles.textoVision}>
          Ser la empresa líder en construcción de viviendas sociales en 
          Costa Rica, reconocida por nuestra excelencia en el diseño, calidad 
          y accesibilidad de nuestras soluciones habitacionales, y por 
          contribuir al desarrollo de comunidades inclusivas y sostenibles, 
          donde cada familia tenga la oportunidad de un hogar 
          seguro y digno.
        </p>
      </div>
    </section>

      <Footer></Footer>
      <WhatsAppButton />
    </>
  )
}