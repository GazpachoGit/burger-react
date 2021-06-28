import React from 'react';
import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function IngredientsListItem(props) {
    const { name, price, image} = props.item
    const [showDitails, setShowDitails] = React.useState(false);
    function showHandler(e) {
        setShowDitails(!showDitails);
    }
    const currentIngredientDetails = <ModalOverlay children={<IngredientDetails item={props.item}/>} closeHandler={showHandler} />
    return (
        <div className={styles.general } style={{width: 250}} onClick={showHandler}>
            <div className={styles.info + ' pr-4 pl-4'}>
                <img alt={name} src={image} on />
                <span className="text text_type_digits-default mt-1 mb-1">
                    {price}
                    <CurrencyIcon type="primary" />
                </span>                                    
            </div>
            <span className="text text_type_main-default">{name}</span>
            <Counter count={1} size="default" />
            {showDitails && currentIngredientDetails}
        </div>
    )
}
