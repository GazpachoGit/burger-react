import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default class AppHeader extends React.Component {
    render() {
        return (
            <header >
                <nav className={styles.nav}>
                    <div className={styles.navContainer}>
                        <a href className={styles.link}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">Конструктор</p>
                        </a>
                        <a href className={styles.link}>
                            <ListIcon type="primary" />
                            <p className="text text_type_main-default">Лента заказов</p>
                        </a>
                    </div>
                    <div className={styles.navContainer}>
                        <Logo />
                    </div>
                    <div className={styles.navContainer}>
                        <a href className={styles.link}>
                            <ProfileIcon type="primary" />
                            <p className="text text_type_main-default">Личный кабинет</p>
                        </a>
                    </div>
                </nav>
            </header>
        )
    }
}