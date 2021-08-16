import React from 'react'
import styles from './constructor-total.module.css'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, CREATE_ORDER_FAILED, SHOW_ORDER_MODAL } from '../../services/actions/'

export default function ConstructorTotal() {

    const total = useSelector(state => state.ingredients.ingredients.reduce((total, item) => item.qty ? total + item.price * item.qty : total, 0));
    const bun = useSelector(state => state.ingredients.burgerComponents.bun);
    const Ids = useSelector(state => state.ingredients.ingredients
        .filter(item => item.qty)
        .map(item => item._id));

    const dispatch = useDispatch();

    const showOrderModal = () => {
        if(bun)
            dispatch(createOrder(Ids));
        else {
            dispatch({
                type:CREATE_ORDER_FAILED,
                message: "Для оформления заказа требуется добавить булку"
            })
            dispatch({type: SHOW_ORDER_MODAL})
        }  
    }

    return (
        <>
            <div className={styles.wrap + ' mt-5'}>
                <span className="text text_type_main-large">
                    {total}
                    <CurrencyIcon type="primary" />
                </span>
                <span className={'ml-10'}>
                    <Button type="primary" size="small" onClick={showOrderModal}>
                        <span className="text text_type_main-default">Оформить заказ</span>
                    </Button>
                </span>
            </div>
        </>
    )
}
