import styles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { singIn } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export default function RegisterPage() {
    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = useCallback((e) => {
        e.preventDefault();
        dispatch(singIn(form, 'register'));
    }, [dispatch, form])

    return (
        <>
            <div className={styles.formContainer}>
                <form className={styles.form + ' pb-20'}>
                    <h2 className="text text_type_main-medium">Регистрация</h2>
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
                    <Button onClick={registerHandler} type="primary" size="medium">Зарегистрироваться</Button>
                </form>
                <p className="text text_type_main-default">Вы уже зарегистрированы? <Link className={styles.link} to={'/login'}>Войти</Link></p>
            </div>
        </>
    )
}