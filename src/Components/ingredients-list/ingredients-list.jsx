import React from 'react';

import styles from './ingredients-list.module.css';
import IngredientsSection from '../ingredients-section/ingredients-section';

import PropTypes from 'prop-types';
import { tabType } from '../../utils/local-types';
import { useSelector } from 'react-redux';
export default function IngredientsList({ tabs }) {

    const { ingredientsRequest, ingredients, ingredientsFailed } = useSelector(state => state.ingredients);

    const sectionList = React.useMemo(() => {
        const arr = []
        tabs.forEach((tab, i) => {
            arr.push({
                id: tab.id,
                title: tab.title,
                ingredients: ingredients.filter(item => item.type === tab.id)
            });
        });
        return arr;
    }, [tabs, ingredients]);

    return (
        <>
            {ingredientsRequest && 'Загрузка...'}
            {ingredientsFailed && 'Произошла ошибка при загрузке ингридиентов'}
            {!ingredientsRequest && !ingredientsFailed && ingredients.length &&
                <ul className={styles.list + ' scrollable'}>
                    {sectionList.map(item => (
                        <IngredientsSection key={item.id} item={item} />
                    ))}
                </ul>}
        </>

    )
}

IngredientsList.propTypes = {
    tabs: PropTypes.arrayOf(tabType).isRequired
}