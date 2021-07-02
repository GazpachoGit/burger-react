import React from 'react';
import styles from './burger-ingredients.module.css'
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsTabs from '../ingredients-tabs/ingredients-tabs';

export default function BurgerIngredients({data, tabs, showIngredientModal}) {
    return (
        <section className={styles.section}>
            <p className="text text_type_main-large mt-10 ">Собери бургер</p>
            <IngredientsTabs tabs={tabs} />
            <IngredientsList data={data} tabs ={tabs} showIngredientModal={showIngredientModal}/>
        </section>
    )
}
