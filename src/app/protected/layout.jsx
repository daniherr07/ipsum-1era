import { ProtectedProvider } from "../context/ProtectedContext";
import { getCookies } from "@/utils/getCookies";

export default async function protectedLayout({ children }) {
    const user = await getCookies()
    return (
        <ProtectedProvider user={user}>
            {children}
        </ProtectedProvider>
    )
}

