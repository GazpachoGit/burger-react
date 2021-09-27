import React, { FC } from 'react';
import styles from './ingredients-tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { tabType } from '../../utils/local-types'
import { useSelector } from '../../services/hooks';
import { TTab } from '../../services/types/data';

export const IngredientsTabs: FC<{ tabs: Array<TTab> }> = ({ tabs }) => {
    const current = useSelector(state => state.ingredients.tabs.reduce((current, tab) => {
        return current.ratio < tab.ratio ? tab : current
    }, state.ingredients.tabs[0]).id);
    return (
        <div className={styles.tabs + ' mt-5'}>
            {tabs.map(({ id, title }) => (
                <Tab onClick={(s: string) => { }} key={id} value={id} active={current === id}>
                    {title}
                </Tab>
            ))}
        </div>
    )
}

export default IngredientsTabs;

