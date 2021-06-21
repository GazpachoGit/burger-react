import React from 'react';
import styles from './burger-constructor.module.css'
import OptionalComponentsList from '../optional-components-list/optional-components-list';
import ConstructorTotal from '../constructor-total/constructor-total';
import ConstructorElementWrappar from '../constructor-el-wrapper/constructor-el-wrapper';

export default class BurgerConstructor extends React.Component {
    ingridiens = this.props.data.slice(0, 4);
    bun = this.ingridiens.find(item => item.type === 'bun');
    optional = this.ingridiens.filter(item => item.type !== 'bun');
    render() {
        return (
            <section className={styles.section}>
                <div className={styles.mainList}>
                    <ConstructorElementWrappar item={this.bun} isLocked={true} />
                    <OptionalComponentsList data={this.optional} />
                    <ConstructorElementWrappar item={this.bun} isLocked={true} />
                    <ConstructorTotal />
                </div>
            </section>
        )
    }
}