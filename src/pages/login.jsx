import styles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { singIn } from '../services/actions/auth';
import { useDispatch } from 'react-redux';

export default function LoginPage() {
    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();

    const loginHandler = useCallback((e) => {
        e.preventDefault();
        dispatch(singIn(form, 'login'));
        
    }, [dispatch, form])

    return (
        <div className={styles.formContainer}>
            <form className={styles.form + ' pb-20'} onSubmit={loginHandler}>
                <h2 className="text text_type_main-medium">Вход</h2>
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
                <Button type="primary" size="medium">Войти</Button>
            </form>
            <p className="text text_type_main-default">Вы - новый пользователь? <Link className={styles.link} to={'/register'}>Зарегистрироваться</Link></p>
            <p className="text text_type_main-default"> Забыли пароль? <Link className={styles.link} to={'/forgot-password'}>Восстановить</Link></p>
        </div>
    )
}