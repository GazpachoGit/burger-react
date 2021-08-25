import styles from './login.module.css';
import { useState, useEffect } from 'react';
import { Route, useHistory, useParams} from 'react-router-dom';
import ProfileForm from '../Components/profile-form/profile-form';
import LogoutForm from '../Components/logout-form/logout-form';
import OrdersHostory from '../Components/order-history/order-history';

export default function ProfilePage() {
    const descObject = {
        info: "В этом разделе вы можете изменить свои персональные данные",
        orders: "история заказов",
        logout: "выход"
    }
    
    const [categoty, setCategory] = useState({name: "info", desc: descObject["info"]})

    const history = useHistory();
    const params = useParams();
    useEffect(()=> {
        if(params?.category )
            setCategory({name: params.category, desc: descObject[params.category]});
        
    }, [params])

    const onClick = (name) => {
        const desc = descObject[name] || "";
        setCategory({name, desc});
        history.push(`/profile/${name}`)
    }
    return (
        <>
            <div className={`${styles.main} ${styles.autoFit} pt-30`}>
                <div className={`${styles.navColumn} mr-15`}>
                    <div className={styles.navContainer}>
                            <p onClick={() => onClick("info")} className={`text text_type_main-large pb-3 ${categoty.name !== 'info' && styles.unselected} ${styles.pointer}`}>Профиль</p>
                            <p onClick={() => onClick("orders")} className={`text text_type_main-large pb-3 ${categoty.name !== 'orders' && styles.unselected} ${styles.pointer}`}>История заказов</p>
                            <p onClick={() => onClick("logout")} className={`text text_type_main-large pb-3 ${categoty.name !== 'logout' && styles.unselected} ${styles.pointer}`}>Выход</p>

                        <p className={ "text text_type_main-default mt-20"}>{categoty.desc}</p>
                    </div>
                </div>
                    <Route path={['/profile',`/profile/info`]} exact={true} component={ProfileForm}/>
                    <Route path={`/profile/orders`} exact={true} component={OrdersHostory}/>
                    <Route path={`/profile/logout`} exact={true} component={LogoutForm}/>
            </div>
        </>
    )
}