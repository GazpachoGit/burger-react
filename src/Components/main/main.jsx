import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'


export default class Main extends React.Component {
    render() {
        return (
            <main className="p-3">
                <p className="text text_type_main-large">Собери бургер</p>
                <div style={{ display: 'flex' }}>
                    <BurgerIngredients data={this.props.data} />
                    <BurgerConstructor data={this.props.data} />
                </div>

            </main>
        )
    }
}