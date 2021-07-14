import React from 'react';
import styles from './burger-ingredients.module.css'
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsTabs from '../ingredients-tabs/ingredients-tabs';
import { useSelector } from 'react-redux';

export default function BurgerIngredients() {

    const tabs = useSelector(state => state.ingredients.tabs)

    return (
        <section className={styles.section}>
            <p className="text text_type_main-large mt-10 ">Собери бургер</p>
            <IngredientsTabs tabs={tabs} />
            <IngredientsList tabs ={tabs} />
        </section>
    )
}
