import { getAuthToken, removeAuthToken } from "@/utils/auth"

export async function loginHandler(data){
    const URL = 'https://be-ksp.analitiq.id/auth/login'
    const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const ok = response.ok
    const responseJson = await response.json()

    return [ok, responseJson]
} 

export async function logoutHandler(){
    const token = getAuthToken()
    const URL = 'https://be-ksp.analitiq.id/auth/logout'
    const response = await fetch(URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const ok = response.ok
    const responseJson = await response.json()
    removeAuthToken()
    return [ok, responseJson]
}