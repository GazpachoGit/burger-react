import React from 'react';
import styles from './optional-components-list.module.css';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/local-types';
import {useCallback} from 'react';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';
import {UPDATE_OPTIONAL} from '../../services/actions/'

export default function OptionalComponentsList({data}) {
    const dispatch = useDispatch();
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = data[dragIndex];

        dispatch({
            type: UPDATE_OPTIONAL,
            optional: update(data, {$splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        })
    }, [data, dispatch]);

    return (
        <ul className={styles.list + ' scrollable'}>{
            data.map((item, index) => (
                <ConstructorElementWrappar key={item._id} index={index} id={item.id} item={item} moveCard={moveCard} isLocked={false} />
            ))
        }</ul>
    )
}

OptionalComponentsList.propTypes = {
    data: PropTypes.arrayOf(ingredientType)
}

