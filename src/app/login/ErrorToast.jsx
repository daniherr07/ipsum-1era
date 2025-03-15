
import { useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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

    const showCookieError = useCallback(() => {
        toast.success("La sesión ha expirado, por favor vuelve a iniciar sesión", {
            toastId: 'cookieExpired', // Unique ID for this toast
        });
    }, []);
    

    useEffect(() => {
        const error = searchParams.get('error')
        const newUser = searchParams.get('newUser')
        const cookie_expired = searchParams.get('cookie_expired')
        if (error) {
            showErrorToast();
        }

        if (newUser){
            showNewToast();
        }

        if (cookie_expired) {
            showCookieError();
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
