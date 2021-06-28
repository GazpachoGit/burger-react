import React from 'react';
import styles from './optional-components-list.module.css';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';

import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/local-types';

export default function OptionalComponentsList(props) {

    return (
        <ul className={styles.list + ' scrollable'}>{
            props.data.map(item => (
                <ConstructorElementWrappar key={item._id} item={item} isLocked={false} />
            ))
        }</ul>
    )
}

OptionalComponentsList.propTypes = {
    data: PropTypes.arrayOf(ingredientType)
}

