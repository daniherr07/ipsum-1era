'use client'
import styles from './page.module.css'
import {Phone, Mail, MapPin } from 'lucide-react'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer(){
    const [loading, setLoading] = useState(false);
    return(
        <section className={styles.contactSection} id='contactos'>
        <div className={styles.container}>
          <h2 className={styles.contactTitle}>Contáctanos</h2>
          <div className={styles.contactGrid}>
            <div style={{width: "100%"}}>
              <h3 className={styles.contactFormTitle}>Escribenos</h3>
              <form action="https://formsubmit.co/mhernandez@ipsumcr.com.com" method="POST" className={styles.contactForm}>
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
                <input type="hidden" name="_next" value="https://www.ipsumcr.com/landing/sent"></input>
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
    )
}