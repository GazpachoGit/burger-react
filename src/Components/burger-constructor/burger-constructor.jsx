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
        for (let i = 1; i < 10; i++) {
            this.optional.push(this.optional[1]);
        }
        return (
            <section className={styles.section + ' p-1 mt-25 mr-4 ml-4'}>
                <ConstructorElementWrappar item={this.bun} isLocked={true} />
                <OptionalComponentsList data={this.optional} />
                <ConstructorElementWrappar item={this.bun} isLocked={true} />
                <ConstructorTotal />
            </section>
        )
    }
}