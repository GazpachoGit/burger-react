import styles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/actions/auth';

export default function ResetPasswordPage() {
    const [form, setValue] = useState({ password: '', code: '', });
    const dispatch = useDispatch();
    const changingPassword = useSelector(state => state.auth.changingPassword);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const resetHandler = useCallback((e) => {
        e.preventDefault();
        dispatch(resetPassword(form));
    }, [dispatch, form])
    return (
        <> {changingPassword ? <div className={styles.formContainer}>

        <form className={styles.form + ' pb-20'} onSubmit={resetHandler}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'} />
            <Input
                type={'text'}
                size={'default'}
                value={form.code}
                name={'code'}
                placeholder={'Введите код из письма'}
                onChange={onChange} />
            <Button type="primary" size="medium">Сохранить</Button>
        </form>
        <p className="text text_type_main-default">Вспомнили пароль? <Link className={styles.link} to={'/login'}>Войти</Link></p>
    </div> : <Redirect to={{pathname: '/forgot-password'}} />}
            
        </>
    )
}