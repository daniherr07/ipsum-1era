'use client'

import styles from './page.module.css'
import Footer from './Footer'
import NavBar from './NavBar'
import WhatsAppButton from './WhatsAppButton'

export default function IpsumConstruction() {

    return(
        <>
        <NavBar></NavBar>

            <header className={styles.headerBonos}>
                <h1 className={styles.titleBonos}>Bonos de vivienda</h1>
            </header>

            <section className={styles.sectionBonos}>
            <div className={styles.contentBonos}>
                <div className={styles.textContentBonos}>
                <p>
                    Nuestra constructora <span className={styles.highlightBonos}>ofrece un servicio llave en mano</span>, donde nos 
                    encargamos de todo el proceso de construcción, incluyendo la gestión de la 
                    cuadrilla, compra de materiales, y trámites de permisos. Nos especializamos 
                    en <span className={styles.highlightBonos}>viviendas de interés social</span> mediante un sistema constructivo en 
                    mampostería integral.
                </p>
                
                <p>
                    También ofrecemos consultoría y dirección técnica en la tramitología para 
                    obtener bonos de vivienda, un subsidio estatal destinado a familias de 
                    bajos recursos, clase media, adultos mayores y personas con discapacidad 
                    que <span className={styles.highlightBonos}>cumplan con estos requisitos</span>:
                </p>
                
                <ul className={styles.requirementsBonos}>
                    <li>Constituir una familia, salvo en el caso de adultos mayores.</li>
                    <li>No haber recibido un bono de vivienda anteriormente.</li>
                    <li>Poseer un lote o no tener ninguna propiedad a su nombre.</li>
                </ul>
                
                <p>
                    Contamos con <span className={styles.highlightBonos}>autorización de Grupo Mutual</span> para realizar estos trámites, y 
                    realizamos un análisis detallado de cada familia para brindar un servicio 
                    personalizado.
                </p>
                
                <p>
                    Nuestra misión es promover <span className={styles.highlightBonos}>edificaciones sostenibles y de alta calidad</span>, 
                    enfocándonos en viviendas unifamiliares que ofrezcan espacios seguros y 
                    dignos para las familias costarricenses, contribuyendo al desarrollo de las 
                    comunidades.
                </p>
                </div>
                
                <div className={styles.imageContainerBonos}>
                <img
                    src="/landing/casa1.webp"
                    alt="Casa modelo de interés social"
                    width={500}
                    height={400}
                    className={styles.imageBonos}
                />
                </div>
            </div>
            </section>
        <Footer></Footer>
        <WhatsAppButton></WhatsAppButton>
        </>    
    )
}