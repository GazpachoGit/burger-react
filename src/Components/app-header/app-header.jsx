import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavItem from '../nav-item/nav-item';


export default function AppHeader() {
 
    return (
        <header >
            <nav className={styles.nav}>
                <div className={styles.navContainer}>
                    <NavItem title="Конструктор" to="/" />
                    <NavItem title="Лента заказов" to="/profile/orders" />
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.navContainer}>
                    <NavItem title="Личный кабинет" to="/profile/info" />
                </div>
            </nav>
        </header>
    )
}
