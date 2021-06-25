import React from 'react';
import styles from './main.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'


export default function Main(props) {
    return (
        <main className ={styles.main}>
            <BurgerIngredients data={props.data} />
            <BurgerConstructor data={props.data} />
        </main>
    )
}