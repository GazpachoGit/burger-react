import React, { FC } from 'react';
import styles from '../constructor-el-wrapper/constructor-el-wrapper.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types/data';

type TProps = {
    item: TIngredient,
    type?: 'top' | 'bottom',
    isLocked: boolean
}

export const BunElement: FC<TProps> = ({ item, type, isLocked }) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.drag}>
                <span hidden={isLocked}><DragIcon type="primary" /></span>
            </div>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={(type === 'bottom') ? item.name + ' (низ)' : item.name + ' (верх)'}
                price={item.price}
                thumbnail={item.image_mobile}>
            </ConstructorElement>
        </div>
    )
}

export default BunElement;

