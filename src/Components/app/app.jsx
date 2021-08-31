import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { SHOW_INGREDIENT_MODAL, SHOW_ORDER_MODAL } from '../../services/actions';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, NotFound404 } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredients, getIngredientsWhenYandexAFK } from '../../services/actions';
import { getUser, SHOW_MESSAGE } from '../../services/actions/auth';
import AnonimRoute from '../anonim-route/anonim-route';
import CommonMessage from '../common-message/common-message';
import SwitchWrapper from '../switch-wrapper/switch-wrapper';


function App() {

  const { showIngredientModal, currentIngredient, showOrderModal } = useSelector(state => state.ingredients);
  const showMessage = useSelector(state => state.auth.showMessage);

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

  const closeCommonMessageHandler = React.useCallback(() => {
    dispatch({
      type: SHOW_MESSAGE
    })
  }, [dispatch]);

  const currentOrderModal = React.useMemo(() => {
    return <Modal children={<OrderDetails />} closeHandler={closeOrderHandler} />
  }, [closeOrderHandler]);

  const currentCommonMessage = React.useMemo(() => {
    return <Modal children={<CommonMessage />} closeHandler={closeCommonMessageHandler} />
  }, [closeCommonMessageHandler]);

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, []);

  return (
    <>
      <Router>
        <AppHeader />
        <SwitchWrapper />
        {showOrderModal && currentOrderModal}
        {showMessage && currentCommonMessage}
      </Router>
    </>
  );
}

export default App;