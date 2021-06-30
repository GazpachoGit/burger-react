import React from 'react'
import styles from './constructor-total.module.css'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

export default function ConstructorTotal(props) {
    const [showDitails, setShowDitails] = React.useState(false);

    function confirmOrder(){
        //...
        setShowDitails(!showDitails);
    }
    const orderModal = <Modal children={<OrderDetails orderId={11111}/>} closeHandler={()=> setShowDitails(!showDitails)} />
    return (
        <>
        <div className={ styles.wrap +' mt-5'}>
            <span className="text text_type_main-large">
                123
                <CurrencyIcon type="primary" />
            </span>
            <span className={'ml-10'}>
                <Button type="primary" size="small" onClick={confirmOrder}>
                    <span className="text text_type_main-default">Оформить заказ</span>
                </Button>
            </span>
        </div>
        {showDitails && orderModal}
        </>
    )
}
