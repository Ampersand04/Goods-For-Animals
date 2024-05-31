// import React from 'react'
// import { motion as m } from 'framer-motion'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';

export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    if (isAuth) {
        return <Navigate to="/" />;
    }

    const onSubmit = async (values) => {
        const data = await dispatch(registerUser(values));

        if (!data.payload) {
            return alert('Не удалось авторизоваться');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
            return navigate('/');
        }
    };
    return (
        <>
            <div className={styles.root}>
                <div className={styles.authBlock}>
                    <div className={styles.header}>
                        <h1>Создать аккаунт</h1>
                        <a className={styles.backButton} href="/">
                            <b></b>
                        </a>
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M41.6665 100H158.333M41.6665 100L91.6665 150M41.6665 100L91.6665 50"
                                stroke="#101010"
                                strokeWidth="16.6667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className={styles.authContent}>
                        <p>
                            Заполните указанные поля, чтобы <br></br>
                            зарегистрировать аккаунт
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                            <label htmlFor="fullname">ФИО</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                placeholder="Введите ФИО"
                                aria-invalid={errors.fullname ? true : false}
                                autoComplete="on"
                                {...register('fullname', {
                                    required: 'Укажите ФИО',
                                    min: (5, '5'),
                                })}
                            />
                            <p className={styles.error}>{errors.fullname?.message}</p>
                            {/* ================== */}
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Введите email"
                                aria-invalid={errors.email ? true : false}
                                autoComplete="on"
                                {...register('email', {
                                    required: 'Укажите почту',
                                    email: 'Убкдитесь в правильности',
                                })}
                            />
                            <p className={styles.error}>{errors.email?.message}</p>

                            {/* =================== */}
                            <label htmlFor="password">Пароль</label>
                            {/* <div> */}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Введите пароль"
                                autoComplete="on"
                                aria-invalid={errors.password ? true : false}
                                {...register('password', {
                                    required: 'Укажите пароль',
                                    min: (8, 'Минимум 8 цифр'),
                                })}
                            />
                            <p className={styles.error}>{errors.password?.message}</p>

                            <button type="submit">Зарегистроваться</button>
                            <p>
                                Уже есть аккаунта? <Link to="/login">Войти</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
