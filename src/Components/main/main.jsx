import React from 'react';
import styles from './main.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/local-types'

export default function Main({ data, tabs, burgerComponents, showIngredientModal, showOrderModal, removeBurgerComponent }) {
    return (
        <main className={styles.main}>
            <BurgerIngredients data={data} tabs={tabs} showIngredientModal={showIngredientModal} />
            <BurgerConstructor
                data={data}
                burgerComponents={burgerComponents}
                showOrderModal={showOrderModal} />
        </main>
    )
}



Main.propTypes = {
    data: PropTypes.arrayOf(ingredientType)
}