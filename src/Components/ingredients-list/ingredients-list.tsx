import React, { FC } from 'react';

import styles from './ingredients-list.module.css';
import IngredientsSection from '../ingredients-section/ingredients-section';

import { TTab, TabSection } from '../../services/types/data';
import { useSelector } from '../../services/hooks';

type TProps = {
    tabs: Array<TTab>
}

export const IngredientsList: FC<TProps> = ({ tabs }) => {

    const { ingredientsRequest, ingredients, ingredientsFailed } = useSelector(state => state.ingredients);

    const sectionList = React.useMemo(() => {
        let arr: TabSection[] = [];
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

export default IngredientsList;
