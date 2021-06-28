import React from 'react';

import styles from './ingredients-section.module.css';
import IngredientsListItem from '../ingredients-list-item/ingredients-list-item';

export default function IngredientsSection(props) {
    return(
        <li className={' mt-10 pb-10'}>
            <p className="text text_type_main-medium">{props.id}</p>
            <div className={styles['section-list'] + ' pt-6 pl-4 pr-4'}>
                {props.ingredients.map(item => (<IngredientsListItem key={item._id} item={item} />))}
            </div>
        </li>
    )
    
}