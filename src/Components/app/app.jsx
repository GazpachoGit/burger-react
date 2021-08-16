import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { SHOW_INGREDIENT_MODAL, SHOW_ORDER_MODAL } from '../../services/actions';


function App() {

  const { showIngredientModal, currentIngredient, showOrderModal } = useSelector(state => state.ingredients);

  const dispatch = useDispatch();

  const closeIngredientHandler = React.useCallback(() => {
    dispatch({
      type: SHOW_INGREDIENT_MODAL,
      item: null
    })
  }, [dispatch]);

  const closeOrderHandler = React.useCallback(() => {
    dispatch({
      type: SHOW_ORDER_MODAL,
      order: null
    })
  }, [dispatch]);

  const currentIngredientDetails = React.useMemo(() => {
    return <Modal title="Детали ингредиента" children={<IngredientDetails />} closeHandler={closeIngredientHandler} />
  }, [currentIngredient, closeIngredientHandler]);

  const currentOrderModal = React.useMemo(() => {
    return <Modal children={<OrderDetails />} closeHandler={closeOrderHandler} />
  }, [closeOrderHandler]);

  return (
    <>
      <AppHeader />
      <Main />
      {showIngredientModal && currentIngredientDetails}
      {showOrderModal && currentOrderModal}
    </>
    //<Main data={testData}/>

  );
}

export default App;