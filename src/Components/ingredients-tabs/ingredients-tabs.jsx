import React from 'react';
import styles from './ingredients-tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {tabType} from '../../utils/local-types'
import { useSelector } from 'react-redux';

export default function IngredientsTabs(props){
const current = useSelector(state => state.ingredients.tabs.reduce((current, tab) => {
    return current.ratio < tab.ratio ? tab : current
}, state.ingredients.tabs[0]).id);
    return (
        <div className={styles.tabs + ' mt-5'}>
            {props.tabs.map(({id, title}) => (
                <Tab key={id} value={id} active={current === id}>
                    {title}
                </Tab>
            ))}
        </div>
    )
}

IngredientsTabs.propTypes = {
    tabs: PropTypes.arrayOf(tabType)
}

