import { Switch, Route, useLocation } from 'react-router-dom';
import { LoginPage,
        RegisterPage,
        ForgotPasswordPage,
        ResetPasswordPage,
        ProfilePage,
        IngredientPage,
        OrderPage,
        NotFound404
     } from '../../pages';
import AnonimRoute from '../anonim-route/anonim-route';
import { ProtectedRoute } from '../protected-route/protected-route';
import Main from '../main/main';
import {useHistory} from 'react-router-dom';
import Modal from '../modal/modal';
import { useCallback } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrdersFeed from '../../pages/orders-feed';
import OpenedOrderDetails from '../opened-order-details/opened-order-details';

export default function SwitchWrapper() {
    const location = useLocation();
    const history = useHistory();
    let background = history.action === 'PUSH' ? location.state?.background : null;

    
    const closeHandler = useCallback(e => {
        e.stopPropagation();
        history.goBack();
    }, []);

    const CurrentIngredientDetails = () => <Modal title="Детали ингредиента" children={<IngredientDetails />} closeHandler={closeHandler} />;
    const CurrentOpenedOrderDetails = () => <Modal children={<OpenedOrderDetails />} closeHandler={closeHandler} />;

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
                <Route path="/feed" exact={true}>
                    <OrdersFeed />
                </Route>
                <Route path={['/feed/:id',`/profile/orders/:id`]} exact={true}>
                    <OrderPage />
                </Route>
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
            {background && <Route path={['/feed/:id',`/profile/orders/:id`]}>
                <CurrentOpenedOrderDetails />    
            </Route>}
        </>
    )
}