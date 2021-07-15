import React from 'react';
import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from '../../utils/local-types';
import {useDispatch} from 'react-redux';
import {ADD_COMPONENT, SHOW_INGREDIENT_MODAL} from '../../services/actions';
import { useDrag } from 'react-dnd';

export default function IngredientsListItem({item}) {
    const { name, price, image, qty} = item;
    
    const dispatch = useDispatch();
    const showIngredientModal = React.useCallback(() => {
        dispatch({
            type: ADD_COMPONENT,
            item:item
        });
        dispatch({
            type: SHOW_INGREDIENT_MODAL,
            item:item
        });
    },[dispatch, item]);

    //drag
    const [{opacity}, dragRef] = useDrag({
        type:'ingredient',
        item: {...item},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <div ref={dragRef} className={styles.general } style={{opacity}} onClick={showIngredientModal}>
            <div className={styles.info + ' pr-4 pl-4'}>
                <img alt={name} src={image} />
                <span className="text text_type_digits-default mt-1 mb-1">
                    {price}
                    <CurrencyIcon type="primary" />
                </span>                                    
            </div>
            <span className="text text_type_main-default">{name}</span>
            {qty && <Counter count={qty} size="default" />}
        </div>
    )
}

IngredientsListItem.propTypes = {
    item: ingredientType
}
