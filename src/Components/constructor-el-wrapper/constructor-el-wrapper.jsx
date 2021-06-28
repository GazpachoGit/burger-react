import React from 'react';
import styles from './constructor-el-wrapper.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ConstructorElementWrapper(props){
    const item = props.item;

    return (
        <div className={styles.wrapper}>
            <div className={styles.drag}>
                <span hidden={props.isLocked}><DragIcon type="primary" /></span>
            </div>
            <ConstructorElement
                type ={props.type}
                isLocked={props.isLocked}
                text={item.name}
                price={200}
                thumbnail={item.image}>
            </ConstructorElement>
        </div>
    )
}
