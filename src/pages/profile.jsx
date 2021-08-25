import styles from './login.module.css';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { singOut } from '../services/actions/auth';

export default function ProfilePage() {
    const descObject = {
        profile: "В этом разделе вы можете изменить свои персональные данные",
        ordersHistory: "история заказов",
        logout: "выход"
    }

    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const [categoty, setCategory] = useState({name: "profile", desc: descObject["profile"]})

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClick = (name) => {
        const desc = descObject[name] || "";
        setCategory({name, desc});
    }

    const dispatch = useDispatch();
    const onSingOut = () => {
        dispatch(singOut());

    }

    return (
        <>
            <div className={`${styles.main} ${styles.autoFit} pt-30`}>
                <div className={`${styles.navColumn} mr-15`}>
                    <div className={styles.navContainer}>
                        <p onClick={() => onClick("profile")} className={`text text_type_main-large pb-3 ${categoty.name !== 'profile' && styles.unselected}`}>Профиль</p>
                        <p onClick={() => onClick("ordersHistory")} className={`text text_type_main-large pb-3 ${categoty.name !== 'ordersHistory' && styles.unselected}`}>История заказов</p>
                        <p onClick={() => onClick("logout")} className={`text text_type_main-large pb-3 ${categoty.name !== 'logout' && styles.unselected}`}>Выход</p>
                        <p className={ "text text_type_main-default mt-20"}>{categoty.desc}</p>
                    </div>
                </div>
                <form className={styles.form + ' pb-20'}>
                    <Input
                        type={'text'}
                        size={'default'}
                        value={form.name}
                        name={'name'}
                        placeholder={'Имя'}
                        onChange={onChange} />
                    <Input
                        type={'text'}
                        size={'default'}
                        value={form.email}
                        name={'email'}
                        placeholder={'e-mail'}
                        onChange={onChange} />
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name={'password'} />
                </form>
            </div>
        </>
    )
}