import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { SHOW_INGREDIENT_MODAL, SHOW_ORDER_MODAL } from '../../services/actions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, NotFound404 } from '../../pages';
import {ProtectedRoute} from '../protected-route/protected-route';
import { getIngredients, getIngredientsWhenYandexAFK } from '../../services/actions';
import {getUser, SHOW_MESSAGE} from '../../services/actions/auth';
import AnonimRoute from '../anonim-route/anonim-route';
import CommonMessage from '../common-message/common-message';


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

  const currentIngredientDetails = React.useMemo(() => {
    return <Modal title="Детали ингредиента" children={<IngredientDetails />} closeHandler={closeIngredientHandler} />
  }, [currentIngredient, closeIngredientHandler]);

  const currentOrderModal = React.useMemo(() => {
    return <Modal children={<OrderDetails />} closeHandler={closeOrderHandler} />
  }, [closeOrderHandler]);

  const currentCommonMessage = React.useMemo(() => {
    return <Modal children={<CommonMessage />} closeHandler={closeCommonMessageHandler} />
  }, [closeCommonMessageHandler]);

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);



  return (
    <>
      <Router>
      <AppHeader />
        <Switch>
          <AnonimRoute path="/login">
            <LoginPage />
          </AnonimRoute>
          <AnonimRoute path="/register" exact={true}>
            <RegisterPage />
          </AnonimRoute>
          <AnonimRoute path="/forgot-password">
            <ForgotPasswordPage />
          </AnonimRoute>
          <Route path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile/:category?" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route path="/" exact={true}>
            <Main />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {showIngredientModal && currentIngredientDetails}
        {showOrderModal && currentOrderModal}
        {showMessage && currentCommonMessage}
      </Router>
    </>

  );
}

export default App;