import styles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
    const [form, setValue] = useState({ email: '', password: '', name: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className={`${styles.main} ${styles.autoFit} pt-30`}>
                <div className="mr-15">
                    <p className="text text_type_main-large pb-3">Профиль</p>
                    <p className="text text_type_main-large pt-3 pb-3">История заказов</p>
                    <p className="text text_type_main-large pt-3">Выход</p>
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