import styles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const [form, setValue] = useState({ email: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className={styles.formContainer}>
                <form className={styles.form + ' pb-20'}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                    <Input
                        type={'text'}
                        size={'default'}
                        value={form.email}
                        name={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={onChange} />
                    <Button type="primary" size="medium">Восстановить</Button>
                </form>
                <p className="text text_type_main-default">Вспомнили пароль? <Link className={styles.link} to={'/login'}>Войти</Link></p>
            </div>
        </>
    )
}