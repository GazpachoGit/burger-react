import React from 'react';
import styles from '../constructor-el-wrapper/constructor-el-wrapper.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/local-types';

export default function BunElement({ item, type, isLocked }) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.drag}>
                <span hidden={isLocked}><DragIcon type="primary" /></span>
            </div>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}>
            </ConstructorElement>
        </div>
    )
}

BunElement.propTypes = {
    item: ingredientType.isRequired,
    type: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired
}

