import React from 'react';
import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from '../../utils/local-types';
import {useDispatch} from 'react-redux';
import {ADD_COMPONENT} from '../../services/actions';

export default function IngredientsListItem(props) {
    const { name, price, image} = props.item;
    
    const dispatch = useDispatch();
    const showIngredientModal = React.useCallback(() => {
        dispatch({
            type: ADD_COMPONENT,
            item:props.item
        })
    },[dispatch, props.item])

    return (
        <div className={styles.general } style={{width: 250}} onClick={showIngredientModal}>
            <div className={styles.info + ' pr-4 pl-4'}>
                <img alt={name} src={image} />
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

IngredientsListItem.propTypes = {
    item: ingredientType
}
