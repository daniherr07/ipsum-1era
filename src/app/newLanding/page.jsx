'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

import styles from './page.module.css'



export default function IpsumConstruction() {
  const [activeText, setActiveText] = useState(1)
  const [selection, setSelection] = useState(1)


  return (
    <>
      <NavBar></NavBar>

      <header className={styles.container} id='inicio'>
        <div className={styles.videoBack}>
          
          <video autoPlay muted preload="auto" className={styles.bgVideo}>
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
            Ofrecemos un servicio de consultoría y dirección técnica en la tramitología para bonos de vivienda, autorizados por Grupo Mutual, entidad bancaria autorizada en la gestión de bonos de vivienda.
            </p>
          </div>
        </div>
      </header>

      <section className={`${styles.container} + ${styles.aboutUs}`} id='mision'>
        <div className={styles.buttons}>
          <button type="button" className={styles.button}
            style={activeText == 1 ? {backgroundColor: "#f1f9ff", color: "#03579B"} : null}
            onClick={() => setActiveText(1)}
          >
          Sobre nosotros
          </button>

          <button type="button" className={styles.button}
            style={activeText == 2 ? {backgroundColor: "#f1f9ff", color: "#03579B"} : null}
            onClick={() => setActiveText(2)}
          >
          Misión
          </button>

          <button type="button" className={styles.button}
            style={activeText == 3 ? {backgroundColor: "#f1f9ff", color: "#03579B"} : null}
            onClick={() => setActiveText(3)}
          >
          Visión
          </button>
          
        </div>

        <div className={styles.aboutInfo}>
          {activeText == 1 &&
            <>
              <p className={styles.aboutText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eius porro cupiditate ipsum sed perspiciatis fuga optio iste eos. Suscipit ut autem doloribus eius maiores ex accusantium cum voluptate eos?</p>
              <Image src={"/landing/art59/img1.jpg"} width={854} height={480} className={styles.aboutUsImage} alt='image'/>
            </>
          }

          {activeText == 2 &&
            <>
              <p className={styles.aboutText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eius porro cupiditate ipsum sed perspiciatis fuga optio iste eos. Suscipit ut autem doloribus eius maiores ex accusantium cum voluptate eos?</p>
              <Image src={"/landing/mision.jpg"} width={854} height={480} className={styles.aboutUsImage} alt='image'/>
            </>
          }

          {activeText == 3 &&
            <>
              <p className={styles.aboutText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eius porro cupiditate ipsum sed perspiciatis fuga optio iste eos. Suscipit ut autem doloribus eius maiores ex accusantium cum voluptate eos?</p>
              <Image src={"/landing/vision.png"} width={854} height={480} className={styles.aboutUsImage} alt='image'/>
            </>
          }
        </div>
      </section>


      <section className={styles.container} id='proyectos'>
        <div className={styles.projectsSection}>
          <Image src={`${ selection == 1 ? '/landing/clp/img1.jpg' : '/landing/credito/img1.jpg'}`} 
          width={854} 
          height={480}
          alt='Fondo'
          className={styles.projectsFondo}
          ></Image>
          <h2 className={styles.projectsTitle}>Nuestros servicios</h2>

          <div className={styles.keys}>

            <div className={styles.key}
              style={selection == 1 ? {left: "0"} : null}
              onClick={() => {setSelection(1)}}
            >
              <p className={styles.keyText}>Bonos</p>
              <Image src={"/landing/home.png"} width={80} height={80} className={styles.keyImage} alt='image'/>
            </div>

            <div className={styles.key}
              style={selection == 2 ? {left: "0"} : null}
              onClick={() => {setSelection(2)}}
            >
              <p className={styles.keyText}>Otros</p>
              <Image src={"/landing/hammer.png"} width={80} height={80} className={styles.keyImage} alt='image'/>
              
            </div>

          </div>

          <div className={styles.projectsInfo}>
            {selection == 1 && 
            <>
            <div className={styles.projectsCard}>

            </div>

            </>}
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  )
}