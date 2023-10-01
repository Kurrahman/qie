import { getAuthToken } from "@/utils/auth"

export async function meHandler(){
    const token = getAuthToken()
    const URL = 'https://be-ksp.analitiq.id/auth/me'
    const response = await fetch(URL, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const ok = response.ok
    const responseJson = await response.json()

    return [ok, responseJson]
} 