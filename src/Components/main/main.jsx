import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

export default class Main extends React.Component {
    render() {
        return (
            <main>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        )
    }
}