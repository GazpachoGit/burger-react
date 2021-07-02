import React from 'react';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default class NavBar extends React.Component {
    render() {
        return (
            <nav>
                <a href>
                    <BurgerIcon type="primary" />
                    Конструктор
                </a>
                <a href>
                    <ListIcon type="primary" />
                    Лента заказов
                </a>
            </nav>

        )
    }
}