import { ProtectedProvider } from "../context/ProtectedContext";
import { getCookies } from "@/utils/getCookies";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function protectedLayout({ children }) {
    const user = await getCookies()
    return (
        <ProtectedProvider user={user}>
            {children}

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
        </ProtectedProvider>
    )
}

