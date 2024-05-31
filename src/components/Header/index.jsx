import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import { useEffect } from 'react';
import { fetchUser, selectIsAuth } from '../../redux/slices/auth';

export const Header = ({ title }) => {
    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    return (
        <header className={styles.header}>
            <Link to={'/'}>
                <img src="logo.png" width={24} alt="" />
                <h1>{title}</h1>
            </Link>

            <nav className={styles.nav}>
                {isAuth ? (
                    <>
                        <Link className={styles.navLink}>
                            <img src="search.svg" width={24} alt="" />
                        </Link>
                        <Link to="/basket" className={styles.navLink}>
                            <img src="basket.svg" width={24} alt="" />
                        </Link>
                        <Link to="/profile" className={styles.navLink}>
                            <img src="profile.svg" width={24} alt="" />
                        </Link>

                        <Link to="/dashboard" className={styles.navLink}>
                            <img src="dashboard.svg" width={24} alt="" />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.navLink}>
                            <li>Войти</li>
                        </Link>
                        <Link to="/signup" className={styles.navLink}>
                            <li>Зарегистрироваться</li>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.node.isRequired,
};
