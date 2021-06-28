import React from 'react';

import styles from './ingredients-list.module.css';
import IngredientsSection from '../ingredients-section/ingredients-section';

import PropTypes from 'prop-types';
import {tabType, ingredientType} from '../../utils/local-types';

export default function IngredientsList({data, tabs}) {

    const sectionList = React.useMemo(() => {
        const arr = []
        tabs.forEach((tab, i) =>{
            arr.push({
                id: tab.title,
                ingredients: data.filter(item => item.type === tab.id)
            });
        });
        return arr;
    },[])

    return (
        <ul className={styles.list + ' scrollable'}>
            {sectionList.map(item => (
                <IngredientsSection key={item.id} {...item} />
            ))}
        </ul>
    )
}

IngredientsList.propTypes = {
    data: PropTypes.arrayOf(ingredientType),
    tabs: PropTypes.arrayOf(tabType)

}