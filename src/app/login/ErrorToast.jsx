
import { useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';




// Este componente verifica si hay un error o un usuario nuevo y muestra un toast
export function ErrorToast(){
    const searchParams = useSearchParams()

    const showErrorToast = useCallback(() => {
        toast.error("Hubo un error: Usuario o contraseña incorrectos", {
            toastId: 'loginError', // Unique ID for this toast
        });
    }, []);

    const showNewToast = useCallback(() => {
        toast.success("Usuario actualizado correctamente, inicia sesión por favor", {
            toastId: 'loginError', // Unique ID for this toast
        });
    }, []);
    

    useEffect(() => {
        const error = searchParams.get('error')
        const newUser = searchParams.get('newUser')
        if (error) {
            showErrorToast();
        }

        if (newUser){
            showNewToast();
        }
    }, [searchParams, showErrorToast, showNewToast]);

return (            
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
  />)
}
