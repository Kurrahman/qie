'use client'
import { useState } from 'react'
import styles from './dashboard.module.css'
import Barchart from '@/components/barchart/barchart'
import Donutchart from "@/components/donutchart/donutchart"
import Sidebar from '@/components/sidebar/sidebar'
import SalesTable from '@/components/salesTable/salesTable'
import Header from '@/components/header/header'

import MenuMap from './menu.json'
import UserTable from '@/components/userTable/userTable'

function Charts(){
    return (
        <div className={styles.charts}>
            <Barchart></Barchart>
            <Donutchart></Donutchart>
        </div>
    )
}

function Sales(){
    return (
        <div className={styles.sales}>
            <div className={styles.contentHeader}>
                <div className={styles.contentTitle}>
                    Sales
                </div>
                <div className={styles.contentSubtitle}>
                    June 2023
                </div>
            </div>
            <SalesTable/>
        </div>
    )
}

function UserManagement(){
    return (
        <div className={styles.sales}>
            <div className={styles.contentHeader}>
                <div className={styles.contentTitle}>
                    User Management
                </div>
            </div>
            <UserTable/>
        </div>
    )
}

export default function Dashboard() {
    const [selectedMenu, setSelectedMenu] = useState(MenuMap.user);
    return (
        <main className={styles.background}>
            <Header/>
            <div className={styles.content}>
                <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
                <div className={styles.dashboardContent}>
                    {selectedMenu === MenuMap.charts ? <Charts/> : ''}
                    {selectedMenu === MenuMap.sales ? <Sales/> : ''}
                    {selectedMenu === MenuMap.user ? <UserManagement/> : ''}
                </div>
            </div>
        </main>
    )
}
