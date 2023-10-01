"use client"
import styles from './sidebar.module.css'
import Image from 'next/image'

import IconMap from './icon.json'
import MenuMap from '@/app/dashboard/menu.json'

export default function Sidebar(props) {
    function isActive(menuName){
        return menuName === props.selectedMenu
    }

    function getMenuStyle(menuName){
        return isActive(menuName) ? styles.selectedMenuItem : styles.menuItem;
    }

    function getLabelStyle(menuName){
        return isActive(menuName) ? styles.selectedMenuLabel : styles.menuLabel;
    }

    function getIcon(menuName){
        return isActive(menuName) ? IconMap[menuName].active : IconMap[menuName].inactive
    }

    function handleClick(menuName){
        props.setSelectedMenu(menuName)
        console.log(props.selectedMenu)
    }

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.section}>
                <div className={styles.sectionName}>Analysis</div>
                <div className={getMenuStyle(MenuMap.charts)} onClick={() => handleClick(MenuMap.charts)}>
                    <Image
                        className={styles.menuIcon}
                        src={getIcon(MenuMap.charts)}
                        width={22}
                        height={22}
                    />
                    <div className={getLabelStyle(MenuMap.charts)}>Dashboard</div>
                </div>
                <div className={getMenuStyle(MenuMap.sales)} onClick={() => handleClick(MenuMap.sales)}>
                    <Image
                        className={styles.menuIcon}
                        src={getIcon(MenuMap.sales)}
                        width={22}
                        height={22}
                    />
                    <div className={getLabelStyle(MenuMap.sales)}>Sales</div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionName}>Admin Access</div>
                <div className={getMenuStyle(MenuMap.user)} onClick={() => handleClick(MenuMap.user)}>
                    <Image
                        className={styles.menuIcon}
                        src={getIcon(MenuMap.user)}
                        width={22}
                        height={22}
                        fill={false}
                    />
                    <div className={getLabelStyle(MenuMap.user)}>User Management</div>
                </div>
            </div>
        </div>
    )
}