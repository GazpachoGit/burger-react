import React from 'react';
import styles from './ingredients-section.module.css';
import IngredientsListItem from '../ingredients-list-item/ingredients-list-item';
import {ingredientsSectionType} from '../../utils/local-types';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {UPDATE_CURRENT_TAB} from '../../services/actions/';

export default function IngredientsSection(props) {
    const dispatch = useDispatch();

    const {ref, inView, entry} = useInView({
        threshold: [0, 0.25, 0.5, 0.75, 1]
    })
    useEffect(() => {
        console.log(`${props.id} ${entry ? entry.intersectionRatio: 0}`)
        dispatch({
            type: UPDATE_CURRENT_TAB,
            id: props.id,
            ratio: entry ? entry.intersectionRatio: 0
        });
    },[inView, entry, dispatch]);


    return(
        <li ref={ref} className={' mt-10 pb-10'}>
            <p className="text text_type_main-medium">{props.title}</p>
            <div className={styles['section-list'] + ' pt-6 pl-4 pr-4'}>
                {props.ingredients.map(item => (<IngredientsListItem key={item._id} item={item} />))}
            </div>
        </li>
    )
}

IngredientsSection.propTypes = {
    item: ingredientsSectionType
}

