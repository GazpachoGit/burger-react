import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './nav-item.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function NavItem({ title, to}) {
    const currentRoute = useSelector(state => state.auth.currentRoute);
    let Child = {};
    const iconType = currentRoute === to ? 'primary' : 'secondary';
    
    const activeStatus = currentRoute !== to && styles.unselected;

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
            <Link to={to} className={`${styles.link} text text_type_main-default mt-4 ml-4`}>
                {Child}
                <span className={`text text_type_main-default ${activeStatus}`}>{title}</span>
            </Link>
        </>
    )
}