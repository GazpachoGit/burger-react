import React from 'react';
import styles from './main.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/local-types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Main({ tabs}) {
    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </main>
    )
}



Main.propTypes = {
    data: PropTypes.arrayOf(ingredientType)
}