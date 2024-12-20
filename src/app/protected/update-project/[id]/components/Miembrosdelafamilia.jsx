'use client'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import styles from '../newproject.module.css';
import { handleChange } from '@/utils/handleChange';

export default function FamilyForm({formData, setFormData, familyMembers, setFamilyMembers, deletedMembers, setDeletedMembers}) {

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    };

    setFamilyMembers(prev => [...prev, newMember]);
    setFormData({
      id: "",
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
    setFormData(prev => (member));
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

      <form onSubmit={handleSubmit} className={styles.form}>
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
              required
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
              required
            />
          </div>
          <div>
            <select
              name="tipoIngresos"
              value={formData.tipoIngresos}
              onChange={e => handleChange(e, setFormData)}
              className={styles.select}
              required
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
              <option value="jefe/a de familia">Jefe/a de Familia</option>
              <option value="cónyuge">Cónyuge</option>
              <option value="hijo/a">Hijo/a</option>
              <option value="abuela/o">Abuela/o</option>
              <option value="hermano/a">Hermano/a</option>
              <option value="otro">Otro</option>
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
                  <div className={styles.subText}>{member.tipoMiembro}</div>
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
                  {(member.adultoMayor || member.adultoMayor == 1) && (!member.discapacidad || member.discapacidad == 0) && <span className="">Adulto Mayor</span>}
                    {(member.discapacidad || member.discapacidad != 0) && (!member.discapacidad || member.discapacidad == 0) && <span>Discapacidad</span>}
                    {(member.adultoMayor || member.adultoMayor == 1) && (member.discapacidad || member.discapacidad == 1) && <span>Mayor y Discapacidad</span>}
                    {(!member.adultoMayor || member.adultoMayor == 0) && (!member.discapacidad || member.discapacidad == 0) && <span>N/A</span>}
                  </div>
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

