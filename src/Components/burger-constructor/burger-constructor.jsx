import React from 'react';
import styles from './burger-constructor.module.css'
import OptionalComponentsList from '../optional-components-list/optional-components-list';
import ConstructorTotal from '../constructor-total/constructor-total';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export default class BurgerConstructor extends React.Component {
    ingridiens = this.props.data.slice(0, 4);
    bun = this.ingridiens.find(item => item.type === 'bun');
    optional = this.ingridiens.filter(item => item.type !== 'bun');
    render() {
        return (
            <section className={styles.section}>
                <div className={styles.mainList}>
                    <ConstructorElement type="top"
                        isLocked={true}
                        text={this.bun.name}
                        price={200}
                        thumbnail={this.bun.image} />
                    <OptionalComponentsList data={this.optional} />
                    <ConstructorElement type="bottom"
                        isLocked={true}
                        text={this.bun.name}
                        price={200}
                        thumbnail={this.bun.image} />
                    <ConstructorTotal />
                </div>
            </section>
        )
    }
}