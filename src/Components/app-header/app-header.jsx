import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default class AppHeader extends React.Component {
    render() {
        return (
            <header >
                <nav className={styles.nav}>
                    <div className={styles.navItem}>
                        <div className={styles.navContainer}>
                            <a href>
                                <BurgerIcon type="primary" />
                                Конструктор
                            </a>
                            <a href>
                                <ListIcon type="primary" />
                                Лента заказов
                            </a>
                        </div>
                    </div>
                    <Logo className={styles.navItem} />
                    <div className={styles.navItem}>
                        <div className={styles.navContainer}>
                            <a href>
                                <ProfileIcon type="primary" />
                                Личный кабинет
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}