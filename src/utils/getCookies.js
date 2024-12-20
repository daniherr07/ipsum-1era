import { cookies } from 'next/headers'

export async function getCookies(){
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('auth')
    if (authCookie) {
        return JSON.parse(authCookie.value)
    } else {
        return null
    }
}