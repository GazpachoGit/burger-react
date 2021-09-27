import React, { FC } from 'react';
import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

export const IngredientsListItem: FC<{ item: TIngredient }> = ({ item }) => {
    const { _id, name, price, image, qty } = item;

    //drag
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...item },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    const location = useLocation();

    return (
        <Link className="link-drop-style"
            to={{
                pathname: `/ingredients/${_id}`,
                state: { background: location }
            }}>
            <div ref={dragRef} className={styles.general} style={{ opacity }}>
                <div className={styles.info + ' pr-4 pl-4'}>
                    <img className={styles.preventPointerEvent} alt={name} src={image} />
                    <span className="text text_type_digits-default mt-1 mb-1">
                        {price}
                        <CurrencyIcon type="primary" />
                    </span>
                </div>
                <span className="text text_type_main-default">{name}</span>
                {!!qty && <Counter count={qty} size="default" />}
            </div>
        </Link>
    )
}
export default IngredientsListItem
