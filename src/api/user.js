import { getAuthToken } from "@/utils/auth"

export async function allUserHandler(page, pageSize){
    const token = getAuthToken()
    const URL = `https://be-ksp.analitiq.id/user/?page=${page}&page_size=${pageSize}`
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

export async function addUserHandler(data){
    const token = getAuthToken()
    const URL = 'https://be-ksp.analitiq.id/user/'
    const response = await fetch(URL, {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const ok = response.ok
    const responseJson = await response.json()

    return [ok, responseJson]
}

export async function editUserHandler(id, data){
    const token = getAuthToken()
    const URL = `https://be-ksp.analitiq.id/user/${id}`
    const response = await fetch(URL, {
        method: 'PUT',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const ok = response.ok
    const responseJson = await response.json()

    return [ok, responseJson]
}

export async function getUserDetailHandler(id){
    const token = getAuthToken()
    const URL = `https://be-ksp.analitiq.id/user/${id}`
    const response = await fetch(URL, {
        method: 'GET',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const ok = response.ok
    const responseJson = await response.json()

    return [ok, responseJson]
}

export async function removeUserHandler(id){
    const token = getAuthToken()
    const URL = `https://be-ksp.analitiq.id/user/${id}`
    const response = await fetch(URL, {
        method: 'DELETE',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return response
}

