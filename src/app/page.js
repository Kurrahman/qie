'use client'
import { isLoggedIn } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export const BASE_URL = 'https://be-ksp.analitiq.id'

export default function Home() {
    useEffect(() => {
        if (isLoggedIn()){
            redirect('/dashboard', 'replace')
        } else {
            redirect('/login', 'replace')
        }
    }, [])
}
