import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'


export default class Main extends React.Component {
    render() {
        return (
            <main style={{ display: 'flex', justifyContent:'center', gap: 40}}>
                    <BurgerIngredients data={this.props.data} />
                    <BurgerConstructor data={this.props.data} />
            </main>
        )
    }
}