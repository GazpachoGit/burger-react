import React from 'react';
import styles from './burger-constructor.module.css'
import OptionalComponentsList from '../optional-components-list/optional-components-list';
import ConstructorTotal from '../constructor-total/constructor-total';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/local-types';

export default function BurgerConstructor(props) {
    const ingridiens = props.data;
    const bun = ingridiens.find(item => item.type === 'bun');
    const optional = ingridiens.filter(item => item.type !== 'bun');
        return (
            <section className={styles.section + ' p-1 mt-25 mr-4 ml-4'}>
                <ConstructorElementWrappar item={bun} isLocked={true} type="top" key="topbun"/>
                <OptionalComponentsList data={optional} />
                <ConstructorElementWrappar item={bun} isLocked={true} type="bottom" key="bottombun"/>
                <ConstructorTotal showOrderModal={props.showOrderModal}/>
            </section>
        )
}

BurgerConstructor.propTypes ={
    data: PropTypes.arrayOf(ingredientType)
} 
