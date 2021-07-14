import React from 'react';
import styles from './burger-constructor.module.css'
import OptionalComponentsList from '../optional-components-list/optional-components-list';
import ConstructorTotal from '../constructor-total/constructor-total';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/local-types';
import { useSelector } from 'react-redux';
export default function BurgerConstructor() {
    const { bun, optional } = useSelector(state => state.ingredients.burgerComponents);

    return (
        <section className={styles.section + ' p-1 mt-25 mr-4 ml-4'}>
            {bun && <ConstructorElementWrappar item={bun} isLocked={true} type="top" key="topbun" />}
            <OptionalComponentsList data={optional} />
            {bun && <ConstructorElementWrappar item={bun} isLocked={true} type="bottom" key="bottombun" />}
            <ConstructorTotal />
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType)
}
