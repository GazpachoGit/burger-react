import React from 'react'
import styles from './constructor-total.module.css'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ConstructorTotal({ total, showOrderModal }) {
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
