import React from 'react';
import styles from './constructor-el-wrapper.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/local-types';

export default function ConstructorElementWrapper(props) {
    const item = props.item;

    return (
        <div className={styles.wrapper}>
            <div className={styles.drag}>
                <span hidden={props.isLocked}><DragIcon type="primary" /></span>
            </div>
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={item.name}
                price={item.price}
                thumbnail={item.image}>
            </ConstructorElement>
        </div>
    )
}

ConstructorElementWrapper.propTypes = {
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    item: ingredientType
}

