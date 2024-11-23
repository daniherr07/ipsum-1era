'use client'

import { useState } from 'react';
import styles from '../newproject.module.css';

export default function FamilyForm({formData, setFormData, familyMembers, setFamilyMembers}) {




  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      nombre: formData.nombre ,
      apellido1: formData.primerApellido, 
      apellido2: formData.segundoApellido,
      identificacion: formData.identificacion,
      ingresos: formData.ingresos,
      telefono: formData.telefono,
      email: formData.email,
      tipo: formData.tipoMiembro,
      especifique: formData.especifique,
      tipoIdentificacion: formData.tipoIdentificacion,
      tipoIngresos: formData.tipoIngresos,
      tipoTelefono: formData.tipoTelefono,
      adultoMayor: formData.adultoMayor,
      discapacidad: formData.discapacidad
    };

    setFamilyMembers(prev => [...prev, newMember]);
    setFormData({
      primerApellido: '',
      segundoApellido: '',
      nombre: '',
      identificacion: '',
      adultoMayor: false,
      discapacidad: false,
      ingresos: '',
      especifique: '',
      tipoIdentificacion: '',
      tipoIngresos: '',
      telefono: '',
      tipoTelefono: '',
      email: '',
      tipoMiembro: ''
    });
  };

  const handleDelete = (id) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Nuevo Caso - Miembros del núcleo familiar</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div>
            <input
              type="text"
              name="primerApellido"
              value={formData.primerApellido}
              onChange={handleInputChange}
              placeholder="Primer Apellido"
              className={styles.input}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="segundoApellido"
              value={formData.segundoApellido}
              onChange={handleInputChange}
              placeholder="Segundo Apellido"
              className={styles.input}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={`${styles.formGrid} ${styles.formGrid2Col}`}>
          <div>
            <input
              type="number"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleInputChange}
              placeholder="Identificación"
              className={`${styles.input} mb-2`}
              required
            />
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="adultoMayor"
                  checked={formData.adultoMayor}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                Adulto mayor
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discapacidad"
                  checked={formData.discapacidad}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                Discapacidad
              </label>
            </div>
          </div>
          <div>
            <select
              name="tipoIdentificacion"
              value={formData.tipoIdentificacion}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option value="">Tipo de Identificación</option>
              <option value="Cédula Nacional">Cédula Nacional</option>
              <option value="DIMEX">DIMEX o Residencia</option>
              <option value="Menor de edad">Menor de edad</option>
            </select>
          </div>
        </div>

        <div className={`${styles.formGrid} ${styles.formGrid2Col}`}>
          <div>
            <input
              type="number"
              name="ingresos"
              value={formData.ingresos}
              onChange={handleInputChange}
              placeholder="Ingresos (en colones)"
              className={styles.input}
              required
            />
          </div>
          <div>
            <select
              name="tipoIngresos"
              value={formData.tipoIngresos}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option value="">Tipo de ingreso</option>
              <option value="Trabajo Formal">Trabajo Formal</option>
              <option value="Trabajo Inormal">Trabajo Informal</option>
              <option value="Beca IMAS">Beca IMAS</option>
              <option value="Sin Ingresos">Sin ingresos</option>
            </select>
          </div>
        </div>

        <div className={`${styles.formGrid} ${styles.formGrid2Col}`}>
          <div>
            <select
              name="tipoMiembro"
              value={formData.tipoMiembro}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option value="">Tipo de miembro</option>
              <option value="Jefe/a de Familia">Jefe/a de Familia</option>
              <option value="Cónyuge">Cónyuge</option>
              <option value="Hijo/a">Hijo/a</option>
              <option value="Abuela/o">Abuela/o</option>
              <option value="Hermano/a">Hermano/a</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

            {formData.tipoMiembro == "Otro" ?
                <div>
                    <input
                    type="text"
                    name="especifique"
                    value={formData.especifique}
                    onChange={handleInputChange}
                    placeholder="Especifíque:"
                    className={styles.input}
                    />
                </div>
            :
                <div>
                    <input
                    type="text"
                    name="especifique"
                    value={formData.especifique}
                    onChange={handleInputChange}
                    placeholder="Especifíque:"
                    className={styles.input}
                    disabled
                    />
                </div>
            }


        </div>

        <div className={`${styles.formGrid} ${styles.formGrid2Col} ${styles.formContacto}`}>
          <div className={styles.checkboxGroup}>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono contacto"
              className={styles.input}
            />
            <select
              name="tipoTelefono"
              value={formData.tipoTelefono}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Tipo</option>
              <option value="Celular">Celular</option>
              <option value="Casa">Casa</option>
            </select>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email:"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.uploadGroup}>
          <div className={styles.cedulaGroup}>
            <span>Subir copia de cédula (PDF)</span>
            <span className={styles.requiredStar}>*</span>
            <button type="button" className={styles.uploadButton}>
              ↑
            </button>
          </div>
          <button
            type="submit"
            className={styles.button}
          >
            Añadir Miembro ↓
          </button>
        </div>
      </form>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Nombre</th>
              <th className={styles.tableHeader}>Identificación</th>
              <th className={styles.tableHeader}>Ingresos</th>
              <th className={styles.tableHeader}>Teléfono</th>
              <th className={styles.tableHeader}>Email</th>
              <th className={styles.tableHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {familyMembers.map((member, key) => (
              <tr key={key}>
                <td className={styles.tableCell}>
                  {member.nombre}
                  <div className={styles.subText}>{member.tipo}</div>
                </td>
                <td className={styles.tableCell}>
                  {member.identificacion}
                  <div className={styles.subText}>{member.tipoIdentificacion}</div>
                </td>
                <td className={styles.tableCell}>
                    ₵{member.ingresos}
                  <div className={styles.subText}>{member.tipoIngresos}</div>
                </td>
                <td className={styles.tableCell}>
                  {member.telefono}
                  <div className={styles.subText}>{member.tipoTelefono}</div>
                </td>
                <td className={styles.tableCell}>
                  {member.email}
                  <div className={styles.subText}>
                    {member.adultoMayor && <span className="mr-2">Adulto Mayor</span>}
                    {member.discapacidad && <span>Discapacidad</span>}
                    {!member.adultoMayor && !member.discapacidad && <span>N/A</span>}
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actionGroup}>
                    <button className={styles.actionButton}>✏️</button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

