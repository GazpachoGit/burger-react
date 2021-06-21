import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default class ConstructorTotal extends React.Component {

    render() {
        return (
            <div style={{  display: 'flex', alignItems:'center', justifyContent:'flex-end' }} className={'mt-5'}>
                <span className="text text_type_main-large">
                    123
                    <CurrencyIcon type="primary" />
                </span>
                <span className={'ml-10'}>
                    <Button type="primary" size="small">
                        <span className="text text_type_main-default">Оформить заказ</span>
                    </Button>
                </span>
            </div>
        )
    }
}