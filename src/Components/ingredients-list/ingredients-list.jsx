import React from 'react';

import styles from './ingredients-list.module.css';
import IngredientsListItem from '../ingredients-list-item/ingredients-list-item';

export default class IngredientsList extends React.Component {
    data = this.props.data;
    buns = this.data.filter(item => item.type === 'bun');
    souces = this.data.filter(item => item.type === 'sauce');
    mains = this.data.filter(item => item.type === 'main');
    render() {

        return (
            <div className={styles.list + ' p-5'}>
                <div className={styles.section + ' mb-3 mt-3'}>
                    <p className="text text_type_main-medium">Основные</p>
                    <div className={styles['section-list']}>
                        {this.mains.map(item => (<IngredientsListItem item={item} />))}
                    </div>
                </div>
                <div className={styles.section}>
                    <p className="text text_type_main-medium">Булки</p>
                    <div className={styles['section-list']}>
                        {this.buns.map(item => (<IngredientsListItem item={item} />))}
                    </div>
                </div>
                <div className={styles.section}>
                    <p className="text text_type_main-medium">Соусы</p>
                    <div className={styles['section-list']}>
                        {this.souces.map(item => (<IngredientsListItem item={item} />))}
                    </div>
                </div>
            </div>
        )
    }
}