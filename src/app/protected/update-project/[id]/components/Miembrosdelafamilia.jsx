'use client'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import styles from '../newproject.module.css';
import { handleChange } from '@/utils/handleChange';
import { useRef } from 'react';


export default function FamilyForm({formData, setFormData, familyMembers, setFamilyMembers, deletedMembers, setDeletedMembers}) {
  const inputFileRef = useRef(null);

  const deleteConfirm = (member) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className={styles.modal}>
                    <h1>¿Estás seguro de eliminar a este miembro familiar?</h1>
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
                            handleDelete(member);
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


  const handleSubmit = () => {
    const newMember = {
      id: formData.id,
      nombre: formData.nombre ,
      primerApellido: formData.primerApellido, 
      segundoApellido: formData.segundoApellido,
      identificacion: formData.identificacion,
      ingresos: formData.ingresos,
      telefono: formData.telefono,
      email: formData.email,
      tipoMiembro: formData.tipoMiembro,
      especifique: formData.especifique,
      tipoIdentificacion: formData.tipoIdentificacion,
      tipoIngresos: formData.tipoIngresos,
      tipoTelefono: formData.tipoTelefono,
      adultoMayor: formData.adultoMayor,
      discapacidad: formData.discapacidad,
      newID: familyMembers.length,
      cedulaFile: inputFileRef.current.files[0] ? inputFileRef.current.files[0] : "",
    };

    setFamilyMembers(prev => [...prev, newMember]);
    setFormData(Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, typeof value === 'boolean' ? false : (typeof value === 'number' ? 0 : "")])));
    inputFileRef.current.value = null;
  };

  const handleEdit = (member) =>{
    member.adultoMayor = member.adultoMayor == 1 ? true : false
    member.discapacidad = member.discapacidad == 1 ? true : false

    if (!member.especifique) {
      member.especifique = ""
    }


    if (member.id) {
      setFamilyMembers(prev => prev.filter(memberCheck => memberCheck.id !== member.id));
    }
    
    if (member.newID){
      setFamilyMembers(prev => prev.filter(memberCheck => memberCheck.newID !== member.newID));
    }

    member.segundoApellido = member.segundoApellido == null ? "" : member.segundoApellido
    member.ingresos = member.ingresos == null ? "" : member.ingresos
    member.tipoIngresos = member.tipoIngresos == null ? "" : member.tipoIngresos
    member.email = member.email == null ? "" : member.email
    member.tipoTelefono = member.tipoTelefono == null ? "" : member.tipoTelefono
    setFormData(prev => (member));
    if (member.cedulaFile) {
      const dataTransfer = new DataTransfer();

      let file;
      if (member.cedulaFile.type && member.cedulaFile.type != "application/octet-stream") {
        file = member.cedulaFile
      } 
      else{
        file = new File([""], member.cedulaFile.name ? member.cedulaFile.name : member.cedulaFile, {
          type: "application/octet-stream",
        });
      }


      
      // Add the file to the DataTransfer object
      dataTransfer.items.add(file);
      
      // Set the files property of the input element
      if (inputFileRef.current) {
        inputFileRef.current.files = dataTransfer.files;
      }
    }
  }
  

  const handleDelete = (deleteMember) => {

    if (deleteMember.id) {
      setDeletedMembers(prev => [...prev, familyMembers.filter(member => member.id == deleteMember.id)[0]]);
      setFamilyMembers(prev => prev.filter(member => member.id !== deleteMember.id));
    }
    
    if (deleteMember.newID){
      setFamilyMembers(prev => prev.filter(member => member.newID !== deleteMember.newID));
    }
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Editar - Miembros del núcleo familiar</h1>
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
              className={`${styles.input} mb-2`}
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
              <option value="Menor de Edad">Menor de edad</option>
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
              <option value="Trabajo Informal">Trabajo Informal</option>
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
                <option value="celular">Celular</option>
                <option value="casa">Casa</option>
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
                  {member.cedulaFile ? 
                    member.cedulaFile instanceof File ?

                      member.cedulaFile.size != 0 || member.cedulaFile.type != "application/octet-stream"?

                      <a href={URL.createObjectURL(member.cedulaFile)} target="_blank">Ver cédula</a>
                      : 
                      <a href={member.cedulaFile.name} target="_blank">Ver cédula </a> 
                    :
                    
                    <a href={member.cedulaFile} target="_blank">Ver cédula </a>
                  :
                  "No hay cedula"}
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actionGroup}>
                    <button className={styles.actionButton} onClick={() => editConfirm(member)}>✏️</button>
                    <button
                      onClick={() => deleteConfirm(member)}
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
