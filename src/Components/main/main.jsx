import React from 'react';
import styles from './main.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {SET_ROUTE} from '../../services/actions/auth';

export default function Main() {
    const dispatch = useDispatch();
    const location = useLocation();
    React.useEffect(() => {
      dispatch({
        type: SET_ROUTE,
        route: location.pathname
      })
    },[]);

    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </main>
    )
}