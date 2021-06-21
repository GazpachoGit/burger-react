import React from 'react';
import styles from './optional-components-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default class BurgerConstructor extends React.Component {
    render() {
        return (
            <div className={styles.list}>{
                this.props.data.map(item => (
                    <div key={item.id} style={{ position: 'relative' }}>
                        <ConstructorElement
                            isLocked={true}
                            text={item.name}
                            price={200}
                            thumbnail={item.image}>
                        </ConstructorElement>
                        <div className={styles.dragIcon}>
                            <DragIcon type="primary" />
                        </div>
                    </div>

                ))
            }</div>
        )
    }
}