import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

export default function AppHeader() {
    return (
        <header >
            <nav className={styles.nav}>
                <div className={styles.navContainer}>
                    <Link to={'/'} className={ styles.linkItem + " text text_type_main-default mt-4 ml-4"}>
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default">Конструктор</span>
                    </Link>
                    <Link to={'/profile/orders'} className={ styles.linkItem + " text text_type_main-default mt-4 ml-4"}>
                        <ListIcon type="primary" />
                        <span className="pl-2">Лента заказов</span>
                    </Link>
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.navContainer}>
                <Link to={'/profile/info'} className={ styles.linkItem + " text text_type_main-default pt-4"}>
                    <ProfileIcon type="primary" />
                    <span className="pl-2">Личный кабинет</span>
                </Link>
                </div>
            </nav>
        </header>
    )
}
