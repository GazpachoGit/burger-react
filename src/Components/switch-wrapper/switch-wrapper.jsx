import { Switch, Route, useLocation } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, NotFound404 } from '../../pages';
import AnonimRoute from '../anonim-route/anonim-route';
import { ProtectedRoute } from '../protected-route/protected-route';
import Main from '../main/main';
import {useHistory} from 'react-router-dom';
import Modal from '../modal/modal';
import { useCallback } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrdersFeed from '../../pages/orders-feed';

export default function SwitchWrapper() {
    const location = useLocation();
    let background = location.state?.background;

    const history = useHistory();
    const closeIngredientHandler = useCallback(e => {
        e.stopPropagation();
        history.goBack();
    }, []);

    const CurrentIngredientDetails = () => <Modal title="Детали ингредиента" children={<IngredientDetails />} closeHandler={closeIngredientHandler} />;

    //изменить начинку модалки брать id из url
    //прописать здесь команду закрытия(в других модалках закрытие же старое)

    return (
        <>
            <Switch location={background || location}>
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
                <ProtectedRoute path="/orders-feed" exact={true}>
                    <OrdersFeed />
                </ProtectedRoute>
                <Route path="/" exact={true}>
                    <Main />
                </Route>
                <Route>
                    <NotFound404 />
                </Route>
            </Switch>
            {background && <Route path="/ingredients/:id">
                <CurrentIngredientDetails />    
            </Route>}

        </>
    )
}