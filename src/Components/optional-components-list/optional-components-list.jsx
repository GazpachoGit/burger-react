import React from 'react';
import styles from './optional-components-list.module.css';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';

export default class BurgerConstructor extends React.Component {
    render() {
        return (
            <div className={styles.list}>{
                this.props.data.map(item => (
                    <ConstructorElementWrappar key={item.id} item={item} isLocked={false} />
                ))
            }</div>
        )
    }
}