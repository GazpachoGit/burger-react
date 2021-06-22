import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'


export default class Main extends React.Component {
    render() {
        return (
            <main style={{ haight: '100%', display: 'flex', justifyContent: 'center', gap: 40, flex: '1 1 0' }}>
                <BurgerIngredients data={this.props.data} />
                <BurgerConstructor data={this.props.data} />
            </main>
        )
    }
}