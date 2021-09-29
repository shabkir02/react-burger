import { FormEvent } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../hooks/hooks';

import { setName, setEmail, setPassword, updateUserInfoRequest } from '../../services/actions/user/user';

import s from './profile-page.module.sass';

const ProfilePage = () => {

    const dispatch = useDispatch();
    const { email, name, password } = useSelector(store => ({
        email: store.user.email,
        name: store.user.name,
        password: store.user.password
    }))

    const updateUserInfoClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserInfoRequest())
    }

    return (
        <div className={`${s.container_form} pt-30`}>
            <form  onSubmit={updateUserInfoClick} className={s.form_wrapper}>
                <div className="mb-6">
                    <Input 
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={e => dispatch(setName(e.target.value))}
                    />
                </div>
                <div className="mb-6">
                    <EmailInput
                        name="email"
                        value={email}
                        onChange={e => dispatch(setEmail(e.target.value))}
                    />
                </div>
                <div className="mb-6">
                    <PasswordInput 
                        name="password"
                        value={password}
                        onChange={e => dispatch(setPassword(e.target.value))}
                    />
                </div>
                <div className={s.profile_btn_wrapper}>
                    <div className={`${s.profile_btn_cancel} text text_type_main-default`}>Отмена</div>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfilePage;