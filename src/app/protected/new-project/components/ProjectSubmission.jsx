'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { address } from '@/app/const';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../newproject.module.css'

export default function ProjectSubmissionForm({
  projectData,
  familyMembers,
  directionData,
  formDataAdmin
}) {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate that there's at least one family member who is the head of the household
    const hasHeadOfHousehold = familyMembers.some(member => member.tipo === 'Jefe/a de Familia');
    if (!hasHeadOfHousehold) {
      setError('Debe haber al menos un miembro de familia que sea jefe/a de hogar');
      return;
    }

    // Combine all data
    const submissionData = {
      projectData,
      familyMembers,
      directionData,
      formDataAdmin
    };

    console.log(submissionData)

    try {
      const response = await fetch(`${address}/saveData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        return toast.error("Hubo un error, verifica los datos e intentalo más tarde")
      }

      const result = await response.json();
      toast.success("Proyecto añadido exitosamente!")
      router.refresh(); // Redirect to a success page
    } catch (error) {
      console.error('Error:', error);
      toast.error("Hubo un error, verifica los datos e intentalo más tarde") // Redirect to a success page
    }
  };

  return (
    <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} >
        <button type="submit" className={styles.saveButton}>
          Guardar Proyecto
        </button>
      </form>
    </div>
  );
}