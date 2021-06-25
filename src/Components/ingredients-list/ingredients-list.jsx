import React from 'react';

import styles from './ingredients-list.module.css';
import IngredientsSection from '../ingredients-section/ingredients-section';

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
        <div className={styles.list + ' scrollable'}>
            {sectionList.map(item => (
                <IngredientsSection key={item.id} {...item} />
            ))}
        </div>
    )
}