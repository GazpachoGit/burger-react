import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export default class IngredientsTabs extends React.Component {
    state = { current: 'one' }
    setCurrent = (value) => {
        this.setState({ current: value })
    }
    render() {
        const { current } = this.state;
        return (
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={() => this.setCurrent('one')}>
                    One
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => this.setCurrent('two')}>
                    Two
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={() => this.setCurrent('three')}>
                    Three
                </Tab>
            </div>
        )
    }
}