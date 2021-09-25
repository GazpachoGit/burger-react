import styles from './login.module.css';
import { useState, useEffect } from 'react';
import { Route, useHistory, useParams} from 'react-router-dom';
import ProfileForm from '../Components/profile-form/profile-form';
import LogoutForm from '../Components/logout-form/logout-form';
import UserOrdersHostory from '../Components/order-history/order-history';

export default function ProfilePage() {
    const descObject = {
        info: "В этом разделе вы можете изменить свои персональные данные",
        orders: "В этом разделе вы можете посмотреть свою историю заказов",
        logout: "выход из профиля"
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
        <div className={`${styles.main} ${styles.autoFit} pt-30`}>
            <nav className={`${styles.navColumn} mr-15`}>
                <ul className={styles.navContainer}>
                        <li onClick={() => onClick("info")} className={`text text_type_main-large pb-3 ${categoty.name !== 'info' && styles.unselected} ${styles.pointer}`}>Профиль</li>
                        <li onClick={() => onClick("orders")} className={`text text_type_main-large pb-3 ${categoty.name !== 'orders' && styles.unselected} ${styles.pointer}`}>История заказов</li>
                        <li onClick={() => onClick("logout")} className={`text text_type_main-large pb-3 ${categoty.name !== 'logout' && styles.unselected} ${styles.pointer}`}>Выход</li>
                    <p className={ "text text_type_main-default mt-20 gray-text"}>{categoty.desc}</p>
                </ul>
            </nav>
            <section className={styles.contentSection}>
                <Route path={['/profile',`/profile/info`]} exact={true} component={ProfileForm}/>
                <Route path={`/profile/orders`} exact={true} component={UserOrdersHostory}/>
                <Route path={`/profile/logout`} exact={true} component={LogoutForm}/>
            </section>
                
        </div>
    )
}