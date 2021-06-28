import React from 'react'
import styles from './constructor-total.module.css'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';

export default function ConstructorTotal(props) {
    const [showDitails, setShowDitails] = React.useState(false);

    function showHandler(e) {
        setShowDitails(!showDitails);
    }
    function confermOrder(){
        //...
        showHandler();
    }
    const orderModal = <ModalOverlay children={<OrderDetails closeHandler={showHandler} orderId={11111}/>} closeHandler={showHandler} />
    return (
        <>
        <div className={ styles.wrap +' mt-5'}>
            <span className="text text_type_main-large">
                123
                <CurrencyIcon type="primary" />
            </span>
            <span className={'ml-10'}>
                <Button type="primary" size="small" onClick={confermOrder}>
                    <span className="text text_type_main-default">Оформить заказ</span>
                </Button>
            </span>
        </div>
        {showDitails && orderModal}
        </>
    )
}
