import React from 'react';
import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export default class IngredientsListItem extends React.Component {
    render() {
        const { name, price, image, id } = this.props.item
        return (
            <div key={id} className={styles.general + ' m-3'}>
                <div className={styles.info}>
                    <img alt={name} src={image} ></img>
                    <div className={styles.cost}>
                        <p className="text text_type_digits-default">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">{name}</p>
                </div>
                <Counter count={1} size="default" />
            </div>
        )
    }
}