import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loginUser, selectIsAuth } from '../../redux/slices/auth.js';

export const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    // const user = useSelector(selectUser)

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    if (isAuth) {
        return <Navigate to="/" />;
    }

    const onSubmit = async (values) => {
        const data = await dispatch(loginUser(values));

        if (!data.payload) {
            return alert('Не удалось авторизоваться');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
            const userData = data.payload.user;

            window.localStorage.setItem('user', JSON.stringify(userData));

            // Проверяем роль пользователя
        }
    };

    return (
        <>
            <div className={styles.root}>
                <div className={styles.authBlock}>
                    <div className={styles.header}>
                        <h1>Войти</h1>
                        <a className={styles.backButton} href={'/'}>
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
                            Введите email и пароль, чтобы войти в<br></br> свой аккаунт
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
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
                                })}
                            />
                            <p className={styles.error}>{errors.email?.message}</p>

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
                                    required: 'Укажите пароль    ',
                                })}
                            />
                            <p className={styles.error}>{errors.password?.message}</p>
                            {/* <span>svg</span> */}
                            {/* </div> */}
                            <Link to="/reset">Забыли пароль?</Link>
                            <button type="submit">Войти</button>
                            <p>
                                Еще нет аккаунта? <Link to="/signUp">Зарегистрируйся</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
