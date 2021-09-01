import {Link} from 'react-router-dom';
import styles from './nav-item.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';



export default function NavItem({ title, to}) {
    const location = useLocation();
    const currentRoute = location.pathname;

    const activeNav =  (to === '/' && to === currentRoute) || (to !== '/' && currentRoute.startsWith(to));

    let Child = {};
    const iconType = activeNav ? 'primary' : 'secondary';
    
    const activeStatus = !activeNav && styles.unselected;

    switch(title){
        case "Конструктор":
            Child = <BurgerIcon type={iconType} />
            break;
        case "Личный кабинет":
            Child = <ProfileIcon type={iconType} />
            break;
        case "Лента заказов":
            Child = <ListIcon type={iconType} />
            break;
        default:
            break;
    }

    return (
        <>
            <Link to={to} className={`${styles.link} text text_type_main-default mt-4 ml-4`} >
                {Child}
                <span className={`text text_type_main-default ${activeStatus}`}>{title}</span>
            </Link>
        </>
    )
}

NavItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
}