import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../pages/login.module.css';
import { useState } from 'react';


export default function ProfileForm() {

    const [form, setValue] = useState({ email: '', password: '', name: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <>
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
        </>
    )
}