import React from 'react';

import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsTabs from '../ingredients-tabs/ingredients-tabs';

export default class BurgerIngredients extends React.Component {
    render() {
        return (
            <section>
                <IngredientsTabs />
                <IngredientsList data={this.props.data} />
            </section>
        )
    }
}