import React from 'react';
import styles from './ingredients-tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientsTabs(props){
const [current, setCurrent] = React.useState(props.tabs[0].id);
console.log(current);
    return (
        <div className={styles.tabs + ' mt-5'}>
            {props.tabs.map(({id, title}) => (
                <Tab key={id} value={id} active={current === id} onClick={() => setCurrent(id)}>
                    {title}
                </Tab>
            ))}
        </div>
    )
}
