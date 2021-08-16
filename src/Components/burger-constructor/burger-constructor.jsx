import React from 'react';
import styles from './burger-constructor.module.css'
import OptionalComponentsList from '../optional-components-list/optional-components-list';
import ConstructorTotal from '../constructor-total/constructor-total';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';
import BunElement from '../bun-element/bun-element';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_COMPONENT } from '../../services/actions/'
export default function BurgerConstructor() {
    const dispatch = useDispatch();
    const { bun, optional } = useSelector(state => state.ingredients.burgerComponents);

    //drop
    const [{ isHover }, dropTarger] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch({
                type: ADD_COMPONENT,
                item: item
            })
        }
    });

    return (
        <section ref={dropTarger} className={`${styles.section} p-1 mt-25 mr-4 ml-4 ${isHover ? styles.onHover : ''}`}>
            {bun && <BunElement item={bun} isLocked={true} type="top" key="topbun" />}
            <OptionalComponentsList data={optional} />
            {bun && <BunElement item={bun} isLocked={true} type="bottom" key="bottombun" />}
            <ConstructorTotal />
        </section>
    )
}

