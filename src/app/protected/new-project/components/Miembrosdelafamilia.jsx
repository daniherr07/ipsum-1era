'use client'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import styles from '../newproject.module.css';
import { handleChange } from '@/utils/handleChange';
import { useRef, useState } from 'react';

export default function FamilyForm({formData, setFormData, familyMembers, setFamilyMembers}) {
  const inputFileRef = useRef(null);
  

  const deleteConfirm = (nombre, apellido1, tipo, id) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className={styles.modal}>
                    <h1>¿Estás seguro de eliminar a este miembro familiar?</h1>
                    <div className={styles.modalMain}>
                        <div className={styles.modalOld}>
                            <h2>Nombre: {nombre + " " + apellido1}</h2>
                            <h2>Tipo: {tipo}</h2>
                        </div>
                    </div>
                    <div className={styles.modalBtns}>
                        <button
                            className={styles.modalUpdate}
                            onClick={() => {
                            handleDelete(id);
                            onClose();
                            }}
                        >
                            Confirmar
                        </button>

                        <button 
                        onClick={onClose}
                        className={styles.modalCancel}
                        >Cancelar
                        </button>
                    </div>
              </div>
            );
          }
    })
  };

  const editConfirm = (member) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className={styles.modal}>
                    <h1>¿Estás seguro de editar a este miembro familiar?</h1>
                    <div className={styles.modalMain}>
                        <div className={styles.modalOld}>
                            <h2>Nombre: {member.nombre + " " + member.primerApellido}</h2>
                            <h2>Tipo: {member.tipoMiembro}</h2>
                        </div>
                    </div>
                    <div className={styles.modalBtns}>
                        <button
                            className={styles.modalUpdate}
                            onClick={() => {
                            handleEdit(member);
                            onClose();
                            }}
                        >
                            Confirmar
                        </button>

                        <button 
                        onClick={onClose}
                        className={styles.modalCancel}
                        >Cancelar
                        </button>
                    </div>
              </div>
            );
          }
    })
  };

  const handleSubmit = async (e) => {

    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => 
        [key, typeof value === 'string' ? value.trim() : value]
      )
    );

    

    let newMember = {
      id: familyMembers.length,
      nombre: trimmedFormData.nombre ,
      primerApellido: trimmedFormData.primerApellido, 
      segundoApellido: trimmedFormData.segundoApellido,
      identificacion: trimmedFormData.identificacion,
      ingresos: trimmedFormData.ingresos,
      telefono: trimmedFormData.telefono,
      email: trimmedFormData.email,
      tipoMiembro: trimmedFormData.tipoMiembro,
      especifique: trimmedFormData.especifique,
      tipoIdentificacion: trimmedFormData.tipoIdentificacion,
      tipoIngresos: trimmedFormData.tipoIngresos,
      tipoTelefono: trimmedFormData.tipoTelefono,
      adultoMayor: trimmedFormData.adultoMayor,
      discapacidad: trimmedFormData.discapacidad,
      cedulaFile: inputFileRef.current.files[0] ? inputFileRef.current.files[0] : "",
    };

    

    setFamilyMembers(prev => [...prev, newMember]);
    setFormData(Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, typeof value === 'boolean' ? false : (typeof value === 'number' ? 0 : "")])));
    inputFileRef.current.value = null;
  };

    const confirmModal = (e) => {
          e.preventDefault()
          confirmAlert({
            closeOnClickOutside: false,
            customUI: ({ onClose }) => 
            <GenericModal 
              onClose={onClose} 
              afterFunction={handleSubmit}
            />,
          })
    }

  const handleDelete = (id) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleEdit = (member) =>{
    handleDelete(member.id)
    setFormData(prev => (member));

    if (member.cedulaFile instanceof File) {
      
      const newFileInput = document.createElement('input');
      newFileInput.type = 'file';
      newFileInput.id = 'file';
      newFileInput.name = 'file';
      newFileInput.className = styles.uploadInput;

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(member.cedulaFile);
      newFileInput.files = dataTransfer.files;

      if (inputFileRef.current) {
        inputFileRef.current.parentNode.replaceChild(newFileInput, inputFileRef.current);
        inputFileRef.current = newFileInput;
      }
    } else {
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Nuevo Caso - Miembros del núcleo familiar</h1>
      </div>

      <form onSubmit={confirmModal} className={styles.form}>
        <div className={styles.formGrid}>
          <div>
            <input
              type="text"
              name="primerApellido"
              value={formData.primerApellido}
              onChange={e => handleChange(e, setFormData)}
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
              onChange={e => handleChange(e, setFormData)}
              placeholder="Segundo Apellido"
              className={styles.input}
            />
          </div>
          <div>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={e => handleChange(e, setFormData)}
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
              onChange={e => handleChange(e, setFormData)}
              placeholder="Identificación"
              className={`${styles.input}`}
              required
            />
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="adultoMayor"
                  checked={formData.adultoMayor}
                  onChange={e => handleChange(e, setFormData)}
                  className={styles.checkbox}
                />
                Adulto mayor
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discapacidad"
                  checked={formData.discapacidad}
                  onChange={e => handleChange(e, setFormData)}
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
              onChange={e => handleChange(e, setFormData)}
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
              onChange={e => handleChange(e, setFormData)}
              placeholder="Ingresos (en colones)"
              className={styles.input}
            />
          </div>
          <div>
            <select
              name="tipoIngresos"
              value={formData.tipoIngresos}
              onChange={e => handleChange(e, setFormData)}
              className={styles.select}
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
              onChange={e => handleChange(e, setFormData)}
              className={styles.select}
              required
            >
              
              <option value="">Tipo de miembro</option>
              {familyMembers.some(member => member.tipoMiembro == "Jefe/a de Familia") ? null : <option value="Jefe/a de Familia">Jefe/a de Familia</option>}
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
                    onChange={e => handleChange(e, setFormData)}
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
                    onChange={e => handleChange(e, setFormData)}
                    placeholder="Especifíque:"
                    className={styles.input}
                    disabled
                    />
                </div>
            }


        </div>

        <div className={`${styles.formGrid} ${styles.formGrid2Col} ${styles.formContacto}`}>

          {
            formData.tipoMiembro == "Jefe/a de Familia" ?
            <>
            
            <div className={styles.checkboxGroup}>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={e => handleChange(e, setFormData)}
                placeholder="Teléfono contacto"
                className={styles.input}
                required
              />
              <select
                name="tipoTelefono"
                value={formData.tipoTelefono}
                onChange={e => handleChange(e, setFormData)}
                className={styles.select}
                required
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
                onChange={e => handleChange(e, setFormData)}
                placeholder="Email:"
                className={styles.input}
              />
            </div>
            
            </>

            :

            <>
            
            <div className={styles.checkboxGroup}>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={e => handleChange(e, setFormData)}
                placeholder="Teléfono contacto"
                className={styles.input}
                
              />
              <select
                name="tipoTelefono"
                value={formData.tipoTelefono}
                onChange={e => handleChange(e, setFormData)}
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
                onChange={e => handleChange(e, setFormData)}
                placeholder="Email:"
                className={styles.input}
              />
            </div>
            
            </>
          }
          
        </div>

        <div className={styles.uploadGroup}>
          <div className={styles.cedulaGroup}>

            <label htmlFor="file" className={styles.uploadLabel}>
              Subir copia de cédula ↑
            </label>
            <input name="file" id='file' ref={inputFileRef}  type="file" className={styles.uploadInput}/>
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
              <th className={styles.tableHeader}>Cedula</th>
              <th className={styles.tableHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {familyMembers.map((member, key) => (
              <tr key={key}>
                <td className={styles.tableCell}>
                  {member.nombre} {member.primerApellido} {member.segundoApellido}
                  <div className={styles.subText}>{member.tipoMiembro}</div>
                </td>
                <td className={styles.tableCell}>
                  {member.identificacion}
                  <div className={styles.subText}>{member.tipoIdentificacion}</div>
                </td>
                <td className={styles.tableCell}>
                    {member.ingresos == null ? "Sin ingresos" : `₵${member.ingresos}`}
                  <div className={styles.subText}>{member.tipoIngresos}</div>
                </td>
                <td className={styles.tableCell}>
                  {member.telefono}
                  <div className={styles.subText}>{member.tipoTelefono}</div>
                </td>
                <td className={styles.tableCell}>
                  {member.email}
                  <div className={styles.subText}>
                  {(member.adultoMayor || member.adultoMayor == 1) && (!member.discapacidad || member.discapacidad == 0) && <span className="">Adulto Mayor</span>}
                    {(member.discapacidad || member.discapacidad != 0) && (!member.discapacidad || member.discapacidad == 0) && <span>Discapacidad</span>}
                    {(member.adultoMayor || member.adultoMayor == 1) && (member.discapacidad || member.discapacidad == 1) && <span>Mayor y Discapacidad</span>}
                    {(!member.adultoMayor || member.adultoMayor == 0) && (!member.discapacidad || member.discapacidad == 0) && <span>N/A</span>}
                  </div>
                </td>
                <td className={styles.tableCell}>
                  {member.cedulaFile ? <a href={URL.createObjectURL(member.cedulaFile)} target="_blank">Ver cédula</a> : "No hay cédula"}
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actionGroup}>
                    <button className={styles.actionButton} onClick={() => editConfirm(member)}>✏️</button>
                    <button
                      onClick={() => deleteConfirm(member.nombre, member.primerApellido, member.tipo, member.id)}
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

function GenericModal({ onClose, afterFunction}) {

  return (
    <div className={styles.newUserModal}>
      <h1>¿Esta seguro de agregar al miembro familiar?</h1>
      <div className={styles.modalBtns}>

        <button className={styles.modalUpdate} onClick={() =>  {afterFunction(); onClose()}}>
          Agregar
        </button>

        <button onClick={onClose} className={styles.modalCancel}>
          Cancelar
        </button>


      </div>
    </div>
  )
}


