import styles from './opened-order-details.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../services/actions/index';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import {formatIngredientsList, getTotal, getFormatedDate} from '../../utils/order-service';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderStatus from '../order-status/order-status';

export default function OpenedOrderDetails() {
    const {openOrderRequest,
            openOrderFailed,
            openOrderFailedMessage,
            order
        } = useSelector(state => state.ingredients.openedOrder);
    const ingredients = useSelector(state => state.ingredients.ingredients);

    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getOrder(id));
    },[getOrder, dispatch, id]);
    let displayIngredients = [];
    let total = 0
    if(order.ingredients) {
      displayIngredients =  formatIngredientsList(order.ingredients, ingredients);
      total = getTotal(displayIngredients);
    }
    const date = getFormatedDate(order.createdAt);
    return (
        <div className={styles.container}>
            {openOrderRequest ? <p>Загрузка заказа</p> : openOrderFailed ? <p>Ошибка: {openOrderFailedMessage}</p> :
            <>
                <p className={"text text_type_digits-medium mb-10 " + styles.center}>#{order.number}</p>
                <p className="text text_type_main-medium mb-3">{order.name}</p>
                <OrderStatus status={order.status} />
                <p className="text text_type_main-medium mt-15">Состав</p>
                <ul className={styles.fullWidth + " scrollable pr-4 mb-10 " + styles.list}>
                    {displayIngredients.length > 0 ? displayIngredients.map(item => 
                    <li key={item._id} className={styles.ingredientContainer+ " mb-4"}>
                        <img className={styles.imgContainer + " mr-4"} alt="img" src={item.image_mobile} />
                        <div className={styles.fullWidth + " " + styles.ingredientText}>
                            <span className="text text_type_main-default">{item.name}</span>
                            <span className={styles.quantity + " ml-4"}>
                                <span className="text text_type_main-default pr-1">{item.qty} x {item.price}  </span>
                                <CurrencyIcon type="primary" />
                            </span>
                        </div>
                    </li>
                    ) : <p>Ингедиенты отсутсвуют</p>}
                </ul>
                <div className={styles.ingredientText + " " + styles.fullWidth}>
                    <span className="text text_type_main-default gray-text">{date}</span>
                    <span className={styles.quantity}>
                        <span className="text text_type_main-default pr-1">{total}</span>
                        <CurrencyIcon type="primary" />
                    </span>
                </div>
            </>
            }
        </div>
    )
}