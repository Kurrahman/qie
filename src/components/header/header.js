import styles from './header.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { removeAuthToken } from '@/utils/auth'
import { meHandler } from '@/api/me'
import { useEffect, useState } from 'react'
import { logoutHandler } from '@/api/login'

const burgerIcon = '/burger.png'
const logoIcon = '/logo.png'
const avatarIcon = '/avatar.png'
const logoutIcon = '/logout.png' 

export default function Header(){
    const router = useRouter()
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')

    useEffect(() => {
        const fetchData = async () =>{
            let [_, response] = await meHandler()
            setUsername(response.employee)
            setEmail(response.email)
        }
        fetchData()
    }, [])

    function handleLogout(){
        logoutHandler()
        router.replace('/')
    }

    return (
        <div className={styles.header}>
            <div className={styles.topLeft}>
                <Image
                    src={burgerIcon}
                    width={22}
                    height={22}
                    className={styles.burgerButton}
                />
                <Image
                    src={logoIcon}
                    height={20}
                    width={100}
                    className={styles.logoIcon}
                />
            </div>
            <div className={styles.topRight}>
                <Image
                    src={avatarIcon}
                    height={40}
                    width={40}
                    className={styles.avatarIcon}
                />
                <div className={styles.user}>
                    <p className={styles.userName}>
                        {username}
                    </p>
                    <p className={styles.email}>
                        {email}
                    </p>
                </div>
                <Image
                    src={logoutIcon}
                    height={20}
                    width={20}
                    style={{padding: '10px 0px'}}
                    onClick={() => handleLogout()}
                />
            </div>
        </div>
    )
}