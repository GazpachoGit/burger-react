import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { forgotPassword } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export default function ForgotPasswordPage() {
    
    const user = useSelector(state => state.auth.user);
    
    const [form, setValue] = useState({ email: '' });
    const changingPassword = useSelector(state => state.auth.changingPassword);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();

    const forgotPasswordHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(form));
    }

    if(user) return <Redirect to={'/'}/>

    return (
        <>
            <div className={styles.formContainer}>
                {!changingPassword &&
                 <form className={styles.form + ' pb-20'} onSubmit={forgotPasswordHandler}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                    <Input
                        type={'text'}
                        size={'default'}
                        value={form.email}
                        name={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={onChange} />
                    <Button type="primary" size="medium">Восстановить</Button>
                </form>}
                {changingPassword &&
                    <Link className="mb-10" to={'/reset-password'}><Button type="primary" size="medium">Далее</Button></Link>
                }
                <p className="text text_type_main-default">Вспомнили пароль? <Link className={styles.link} to={'/login'}>Войти</Link></p>
            </div>
        </>
    )
}