import React from 'react';
import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientsListItem(props) {
    const { name, price, image} = props.item
    return (
        <div className={styles.general } style={{width: 250}}>
            <div className={styles.info + ' pr-4 pl-4'}>
                <img alt={name} src={image}></img>
                <span className="text text_type_digits-default mt-1 mb-1">
                    {price}
                    <CurrencyIcon type="primary" />
                </span>                                    
            </div>
            <span className="text text_type_main-default">{name}</span>
            <Counter count={1} size="default" />
        </div>
    )
}
