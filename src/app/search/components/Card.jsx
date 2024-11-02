import React from 'react';
import styles from './card.module.css'
import { HotTable, HotColumn } from "handsontable";
import Image from 'next/image';

export default function Card({item}) {
    return (
    <>
    <div className={styles.card}>
      {/* Header */}
      <header className={styles.header}>
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
              <span className={styles.value}>Pre-análisis</span>
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
          <div className={styles.ramtBadge}>
            <p className={styles.ramtBadgeTxt}>{item.tipoBono}</p>
          </div>

          {/* Cadastral Plan */}
          <div>
            <span className={styles.label}>Plano de Catastro</span>
            <span className={styles.value}>{item.planoCatastro}</span>
          </div>

          {/* Edit Button */}
          <button className={styles.editButton}>
            <Image src={"pen.svg"} className={styles.editIcon} width={20} height={20} />
            Editar
          </button>

          {/* Phone Number */}
          <div>
            <span className={styles.label}>Teléfono</span>
            <span className={styles.value}>{item.telefono}</span>
          </div>

          {/* Communication Buttons */}
          <div className={styles.communicationButtons}>
            <button className={styles.callButton}>
              <Image src={"call.svg"}  width={20} height={20}/>
            </button>
            <button className={styles.emailButton}>
              <Image src={"mail.svg"}  width={20} height={20}/>
            </button>
            <button className={styles.whatsappButton}>
              <Image src={"whatsapp.svg"}  width={20} height={20}/>
            </button>
          </div>

          {/* Referral Information */}
          <div>
            <span className={styles.label}>Referido por</span>
            <span className={styles.value}>Bernardita Hernández</span>
            <span className={styles.currentStage}>Etapa Actual : 22/06/2024</span>
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
            <span className={styles.value}>Grupal: {item.grupoProyecto}</span>
          </div>
          <div>
            <span className={styles.label}>Analista</span>
            <span className={styles.value}>{item.analista}</span>
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
            <span className={styles.value}>Magdalena Hernández</span>
          </div>
        </div>
      </footer>
    </div>
  
    </>
    );
  }
