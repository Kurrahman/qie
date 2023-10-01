'use client'
import { useState } from 'react'
import styles from './login.module.css'
import { loginHandler } from '../../api/login'
import { useRouter } from 'next/navigation'
import { setAuthToken } from '@/utils/auth'

export default function Login(){
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function onSubmit(event){
        event.preventDefault()
        
        if (email && password){
            let data = {
                email: email,
                password: password
            }
            let [ok, response] = await loginHandler(data)
            if (ok){
                setAuthToken(response.token)
                router.push('/dashboard')
            }
        } else {
            alert('Both fields are required')
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className={styles.loginContainer}>
                <div>
                    <p className={styles.title}>
                        Login
                    </p>
                    <p className={styles.subtitle}>
                        Welcome, enter your credentials to continue
                    </p>
                </div>
                <div className={styles.form}>
                    <form>
                        <div className={styles.inputContainer}>
                            <label>
                                Email
                            </label>
                            <input type='text' name='email' className={styles.input} placeholder='example@email.com' onChange={e => setEmail(e.target.value)}></input>
                            
                            <label>
                                Password
                            </label>
                            <input type='password' name='password' className={styles.input} onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <div className={styles.submitContainer} onClick={e => onSubmit(e)}>
                            <input type='submit' onSubmit={e => onSubmit(e)}></input>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}