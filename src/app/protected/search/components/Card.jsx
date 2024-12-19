import React from 'react';
import styles from './card.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function Card({item}) {
  console.log(item)
    return (
    <>
    <div className={styles.card}>
      {/* Header */}
      <header className={styles.header} style={{backgroundColor: `${item.estadoColor}`}}>
        <div className={styles.headerLeft}>
          <h1 className={styles.name}>{item.nombreProyecto}</h1>
          <span className={styles.id}>
          {item.cedula}
          </span>
        </div>
        <button className={styles.copyButton}>
          Copiar info
          <svg className={styles.copyIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4V16C8 17.1 8.9 18 10 18H18C19.1 18 20 17.1 20 16V7.8C20 7.3 19.8 6.8 19.4 6.4L17.6 4.6C17.2 4.2 16.7 4 16.2 4H10C8.9 4 8 4.9 8 6ZM16 5.5L18.5 8H16V5.5ZM4 4H6V20H18V22H6C4.9 22 4 21.1 4 20V4Z" fill="currentColor"/>
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Location Grid */}
          <div className={styles.locationGrid}>
            <div>
              <span className={styles.label}>Distrito</span>
              <span className={styles.value}>{item.distrito}</span>
            </div>
            <div>
              <span className={styles.label}>Cantón</span>
              <span className={styles.value}>{item.canton}</span>
            </div>
            <div>
              <span className={styles.label}>Provincia</span>
              <span className={styles.value}>{item.provincia}</span>
            </div>
            <div>
              <span className={styles.label}>Etapa</span>
              <span className={styles.value}>
                Etapa: {item.etapa}
              </span>
              <span className={styles.value}>
                Subetapa: {item.subetapa}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className={styles.address}>
            <span className={styles.label}>Otras señas:</span>
            <p className={styles.value}>{item.senasDescripcion}</p>
          </div>

          {/* Historical Data */}
          <div className={styles.historical}>
            <span className={styles.label}>Historial</span>
            <div className={styles.historicalGrid}>
              <div>
                <span className={styles.label}>APC</span>
                <span className={styles.value}>{item.codigoApc}</span>
              </div>
              <div>
                <span className={styles.label}>CFIA</span>
                <span className={styles.value}>{item.codigoCfia}</span>
              </div>
            </div>
          </div>

          {/* Scrollable Area (placeholder) */}
          <div className={styles.scrollArea}></div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* RAMT Badge */}
          <div className={styles.ramtBadge} style={{backgroundColor: `#03579B`}}>
            <p className={styles.ramtBadgeTxt}>{item.tipoBono}</p>
          </div>

          {/* Cadastral Plan */}
          <div>
            <span className={styles.label}>Plano de Catastro</span>
            <span className={styles.value}>{item.planoCatastro}</span>
          </div>

          {/* Edit Button */}
          <Link href={`/protected/update-project/${item.id}`}>
          <button className={styles.editButton}>
            
              <Image src={"/pen.svg"} className={styles.editIcon} width={20} height={20} alt='icono'/>
              <p style={{color: "#fff", textDecoration: "none"}}>Editar</p> 

          </button>
          </Link>

          {/* Phone Number */}
          <div>
            <span className={styles.label}>Teléfono</span>
            <span className={styles.value}>{item.telefono}</span>
          </div>

          {/* Communication Buttons */}
          <div className={styles.communicationButtons}>
            <button className={styles.callButton}>
              <a href={`tel:+506${item.telefono}`}>
                <Image src={"/call.svg"}  width={20} height={20} alt='llamada'/>
              </a>
              
            </button>
            <button className={styles.emailButton}>
              <a href={`mailto:${item.email}`}>
                <Image src={"/mail.svg"}  width={20} height={20} alt='correo' />
              </a>
            </button>
            <button className={styles.whatsappButton}>
              <a href={`https://wa.me/+506${item.telefono}`}>
                <Image src={"/whatsapp.svg"}  width={20} height={20} alt='wasap'/>
              </a>

            </button>
          </div>

          {/* Referral Information */}
          <div>
            <span className={styles.label}>Promotor Ipsum</span>
            <span className={styles.value}>{item.promotorInterno} (Interno)</span>
          </div>
          <div>
            <span className={styles.label}>Promotor Entidad</span>
            <span className={styles.value}>{item.promotorExterno} </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <span className={styles.label}>Entidad:</span>
            <span className={styles.value}>{item.entidad}</span>
          </div>
          <div>
            <span className={styles.label}>Tipo proyecto</span>
            <span className={styles.value}>{item.grupoProyecto}</span>
          </div>
          <div>
            <span className={styles.label}>Analista</span>
            <span className={styles.value}>{item.analistaEntidad}</span>
          </div>
          <div>
            <span className={styles.label}>Fiscal Asignado:</span>
            <span className={styles.value}>{item.fiscalAsignado}</span>
          </div>
          <div>
            <span className={styles.label}>Formaliza</span>
            <span className={styles.value}>{item.centroNegocios}</span>
          </div>
          <div>
            <span className={styles.label}>Analista IPSUM:</span>
            <span className={styles.value}>{item.analistaIpsum}</span>
          </div>
        </div>
      </footer>
    </div>
  
    </>
    );
  }
