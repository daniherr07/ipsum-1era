'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

import styles from './page.module.css'



export default function IpsumConstruction() {
  

  
  const projects = [
    {
      nombre: "Bono Artículo 59",
      img: "/landing/art59/img1.jpg",
      icon: "/landing/art59/icono.gif",
      description: "El Bono Artículo 59 responde a la directriz 27 del Banhvi y es una modalidad de subsidio que se otorga a las familias con necesidades especiales, facilitando el acceso a una vivienda adecuada bajo condiciones específicas y flexibles. El subsidio no incluye Gastos Administrativos y permisos de construcción",
      linkTo: "https://www.ipsumcr.com/landing/art59"
    },
    {
      nombre: "Construccion en Lote Propio",
      img: "/landing/clp/img1.jpg",
      icon: "/landing/clp/icono.gif",
      description: "Para poder construir una casa, es necesario que la familia tenga un lote propio inscrito en el registro nacional a nombre de la persona que realiza el trámite, con plano de catastro visado por la municipalidad, acceso a servicios públicos (agua y luz) y estar al día en la municipalidad.",
      linkTo: "https://www.ipsumcr.com/landing/clp"
    },
    {
      nombre: "Remodelacion, Ampliacion, Mejoras y Terminacion",
      img: "/landing/ramt/img1.jpg",
      icon: "/landing/ramt/icono.gif",
      description: "Permite a las familias realizar mejoras significativas en sus hogares mediante un bono de vivienda, facilitando el financiamiento para proyectos de remodelación, ampliación, mejora o terminación de su vivienda. Este programa está diseñado para apoyar a aquellas familias que ya poseen una vivienda",
      linkTo: "https://www.ipsumcr.com/landing/ramt"
    },
    {
      nombre: "Bono Credito",
      img: "/landing/credito/img1.jpg",
      icon: "/landing/credito/icono.gif",
      description: "Modalidad de financiamiento diseñada para que las familias puedan acceder a una vivienda mediante la combinación de un bono y un crédito complementario. Permite cubrir una parte del costo de la vivienda con el bono, que la familia puede pagar de manera gradual",
      linkTo: "https://www.ipsumcr.com/landing/credito"
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
      <NavBar></NavBar>

      <section className={styles.heroSection} id='inicio'>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <Image
              src="/landing/logo.svg"
              alt="IPSUM Logo"
              width={800}
              height={300}
              className={styles.heroLogo}
            />
          </div>
        </div>
      </section>

      <section className={styles.missionVisionSection} id='mision'>
        <div className={styles.container}>
          <div className={styles.aboutUs}>
            <h1 className={styles.aboutUsTitulo}>Sobre Nosotros</h1>
            <p>
            Ofrecemos un servicio de consultoría y dirección técnica en la tramitología para bonos de vivienda, autorizados por Grupo Mutual, entidad bancaria autorizada en la gestión de bonos de vivienda.
            </p>
            <br />
            <p>Nuestra constructora trabaja llave en mano, modalidad en donde la empresa se encarga de todo el proceso de construcción, como es el manejo de la cuadrilla que realizará la obra, la compra de materiales, así también como el trámite de los permisos de construcción. Así mismo se realizará la parte técnica que es requisito para la constitución del expediente para el trámite del bono de vivienda. El sistema constructivo para la construcción de las casas es en mampostería integral (block).
            </p>
            <br />
            
            <p>Un bono de vivienda es un subsidio que equivale a una donación o ayuda por parte del estado. Se otorga a familias de bajos recursos económicos, clase media, adultos mayores y personas con alguna discapacidad física que cumplan con las condiciones que la ley estipula para la obtención de este beneficio.</p>
            <br />
            <p>El BANHVI, dentro de sus requisitos generales, establece que para obtener bono de vivienda se necesita:</p>
            <br />
            <ol>
              <li>Tener constituida una familia (con excepción a los adultos mayores).</li>
              <li>No haber recibido bono con anterioridad.</li>
              <li>Contar con máximo un lote propio. De contar con lote, puede solicitar el Bono para construir la vivienda en el lote propio</li>
              <li>No poseer casa propia, a no ser que requiera remodelación, ampliación, mejoras o terminación (RAMT)</li>
            </ol>
            <br />
            <p>Para IPSUM es necesario llevar a cabo un análisis exhaustivo acerca de las condiciones del núcleo familiar, con el objetivo de ofrecer una asesoría para la conformación del expediente y el tipo de bono al que puedan optar.</p>
            

            
          </div>


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
                width={280}
                height={280}
                className={styles.missionVisionImage}
              />
              <p className={styles.missionVisionText}>
                Ser la empresa líder en construcción de viviendas sociales en Costa Rica, reconocida por nuestra excelencia en el diseño, calidad y accesibilidad de nuestras soluciones habitacionales, y por contribuir al desarrollo de comunidades inclusivas y sostenibles, donde cada familia tenga la oportunidad de un hogar seguro y digno.
              </p>
            </div>
          </div>


        </div>
      </section>

      <section className={styles.projectsSection} id='proyectos'>
        <div className={styles.container}>
          <h2 className={styles.projectsTitle}>Tipos de bono</h2>
          <div className={styles.projectsCards}>
          {
            projects.map((item, key) =>(
              <div className={styles.cardBono} key={key}>
                <h1 className={styles.cardTitle}>{item.nombre}</h1>
                <Image src={item.img} width={300} height={300} className={styles.cardImage}alt='Imagen'></Image>
                <hr />
                <div className={styles.cardInfo}>
                  <Image src={item.icon} width={300} height={300} className={styles.cardIcon} alt='Icono'></Image>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
                
                <Link href={item.linkTo} className={styles.cardLinkTo}>Ver detalles</Link>
              </div>
            ))
          }
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  )
}