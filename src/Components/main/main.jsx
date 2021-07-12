import React from 'react';
import styles from './main.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/local-types'

export default function Main({ tabs}) {
    return (
        <main className={styles.main}>
            <BurgerIngredients tabs={tabs} />
            <BurgerConstructor />
        </main>
    )
}



Main.propTypes = {
    data: PropTypes.arrayOf(ingredientType)
}