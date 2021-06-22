import React from 'react';

import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsTabs from '../ingredients-tabs/ingredients-tabs';

export default class BurgerIngredients extends React.Component {
    render() {
        return (
            <section style={{ display: 'flex', flexDirection: 'column' }}>
                <p className="text text_type_main-large mt-10 ">Собери бургер</p>
                <IngredientsTabs />
                <IngredientsList data={this.props.data} />
            </section>
        )
    }
}