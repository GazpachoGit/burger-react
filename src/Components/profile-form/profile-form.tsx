import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { updateUser } from '../../services/actions/auth';
import { useEffect } from 'react';
import styles from './profile-form.module.css';
import { TUser } from '../../services/types/data';


export default function ProfileForm() {
    const incomeUser = useSelector(state => state.auth.user);
    const user = incomeUser as TUser;

    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const dispatch = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    function updateUserHandler(e: FormEvent) {
        e.preventDefault();
        dispatch(updateUser(form))
    }
    useEffect(() => {
        setValue({ email: user.email, password: '', name: user.name })
    }, [user])

    function revertHandler() {
        //e.preventDefault();
        setValue({ email: user.email, password: '', name: user.name })
    }
    return (
        <form className={styles.form + ' pb-20'} onSubmit={updateUserHandler}>
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
            <div className={styles.buttonContainer}>
                <Button type="primary" size="medium">Сохранить</Button>
                <Button onClick={revertHandler} type="primary" size="medium">Отмена</Button>
            </div>
        </form>
    )
}