import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export default class ConstructorElementWrapper extends React.Component {

    render() {
        const item = this.props.item;

        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '10%' }}>
                    <span hidden={this.props.isLocked}><DragIcon type="primary" /></span>
                </div>
                <ConstructorElement
                    isLocked={this.props.isLocked}
                    text={item.name}
                    price={200}
                    thumbnail={item.image}>
                </ConstructorElement>
            </div>
        )
    }
}