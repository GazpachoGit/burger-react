import React from 'react';
import styles from './optional-components-list.module.css';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';

export default class BurgerConstructor extends React.Component {
    render() {
        return (
            <ul className={styles.list + ' scrollable'}>{
                this.props.data.map(item => (
                    <ConstructorElementWrappar key={item._id} item={item} isLocked={false} />
                ))
            }</ul>
        )
    }
}