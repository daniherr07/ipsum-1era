'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {Phone, Mail, MapPin } from 'lucide-react'
import styles from './page.module.css'
import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'

export default function IpsumConstruction() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    alert("Correo enviado correctamente!")
  }, [])

  
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
          <h2 className={styles.projectsTitle}>Proyectos</h2>
          <div className={styles.projectsCarousel}>
            
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id='contactos'>
        <div className={styles.container}>
          <h2 className={styles.contactTitle}>Contáctanos</h2>
          <div className={styles.contactGrid}>
            <div style={{width: "100%"}}>
              <h3 className={styles.contactFormTitle}>Escribenos</h3>
              <form action="https://formsubmit.co/45f6bb2607cbf2827937f6b45dc49749" method="POST" className={styles.contactForm}>
              <input
                  type="text"
                  placeholder="Nombre"
                  name='nombre'
                  className={styles.formInput}
                  required
                />

                <input
                  type="text"
                  placeholder="Apellido"
                  name='apellido'
                  className={styles.formInput}
                  required
                />

                <input
                  type="email"
                  name='email'
                  placeholder="Correo electrónico"
                  className={styles.formInput}
                  required
                />

                <input
                  type="number"
                  name='tel'
                  placeholder="Teléfono"
                  className={styles.formInput}
                  required
                />


                <textarea
                  placeholder="Mensaje"
                  name='mensaje'
                  rows={5}
                  className={styles.formTextarea}
                  required
                  defaultValue={"Hola, estoy interesado en obtener información sobre IPSUM y los bonos de vivienda. ¿Podrían brindarme detalles sobre los requisitos y beneficios? ¡Gracias!"}
                />
                
                <input type="hidden" name="_subject" value="Nuevo solicitud de información" />
                <input type="hidden" name="_autoresponse" value="Gracias por contactarnos, IPSUM se podrá en contacto contigo pronto." />
                <input type="hidden" name="_next" value="http://localhost:3000/landing/sent"></input>
                <input type="hidden" name="_template" value="table"></input>

                <button
                  type="submit"
                  className={styles.formSubmitButton}
                  style={{display:"flex", flexDirection: "row", placeContent: "center", placeItems: "center", gap: "1em"}}
                  onClick={() => setLoading(!loading)}
                >
                  {
                    loading ?
                    <p style={{display: "flex", placeItems: "center", placeContent: "center", gap: "1em"}}> Enviando consulta... <CircularProgress /> </p> 
                    :
                    <p style={{display: "flex", placeItems: "center", placeContent: "center", gap: "1em"}}>Enviar consulta <Mail /></p>
                  }     
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
                  <span>info@ipsumcr.com</span>
                </div>
                <div className={styles.contactInfoItem}>
                  <MapPin />
                  <span>Moravia, San José</span>
                </div>
                <Link
                  href="https://wa.me/+50688082269/?text=Hola,%20estoy%20interesado%20en%20obtener%20información%20sobre%20IPSUM%20y%20los%20bonos%20de%20vivienda.%20¿Podrían%20brindarme%20detalles%20sobre%20los%20requisitos?%20¡Gracias!"
                  className={styles.whatsappButton}
                  style={{display:"flex", flexDirection: "row", placeContent: "center", placeItems: "center", gap: "1em"}}
                >
                  <span>¡Escribenos al Whatsapp!</span>
                  <Image src="/landing/wasap.svg" width={40} height={40} alt='logo wasap'/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}