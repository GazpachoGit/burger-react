import React, { FC } from 'react';
import styles from './optional-components-list.module.css';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';
import { useCallback } from 'react';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';
import { UPDATE_OPTIONAL } from '../../services/actions'
import { TIngredient } from '../../services/types/data';

export const OptionalComponentsList: FC<{data: Array<TIngredient>}> = ({ data }) => {
    const dispatch = useDispatch();
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = data[dragIndex];

        dispatch({
            type: UPDATE_OPTIONAL,
            optional: update(data, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        })
    }, [data, dispatch]);

    return (
        <ul className={styles.list + ' scrollable'}>{
            data.map((item, index) => (
                <ConstructorElementWrappar key={item.id} index={index} item={item} moveCard={moveCard} />
            ))
        }</ul>
    )
}
export default OptionalComponentsList;

