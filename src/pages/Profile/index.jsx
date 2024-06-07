import { useEffect } from 'react';
import { Layout } from '../../components/Layout/Layout';
import styles from './Profile.module.scss';
import { fetchUser, logoutUser, selectIsAuth, selectUser } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/product';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const isAuth = useSelector(selectIsAuth);

    const status = useSelector((state) => state.product.status);
    // const basket = useSelector((state) => state.product.basket);

    if (!isAuth) {
        navigate('/');
    }

    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logoutUser());
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user'); // Очищаем данные пользователя при выходе
        }
        return navigate('/');
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    return (
        <Layout title={'Мой профиль'}>
            <div className={styles.profile}>
                <div className={styles.info}>
                    <img src="profile.jpg" alt="" />

                    <div>
                        <h2>{user?.fullname}</h2>
                        <p> Пользователь #{user?.id}</p>
                        <button onClick={onClickLogout}>Удалить аккаунт</button>
                    </div>
                </div>
                {/* <div className={styles.tabs}>
                    <div
                        className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
                        onClick={() => handleTabClick('profile')}>
                        <p>Мой профиль</p>
                    </div>
                    {user?.role === 'ADMIN' && (
                        <div
                            className={`${styles.tab} ${
                                activeTab === 'admin' ? styles.active : ''
                            }`}
                            onClick={() => handleTabClick('admin')}>
                            <p>Админ панель</p>
                        </div>
                    )}
                    <div
                        className={`${styles.tab} ${
                            activeTab === 'favorites' ? styles.active : ''
                        }`}
                        onClick={() => handleTabClick('favorites')}>
                        <p>Мои любимые рецепты</p>
                    </div>
                </div> */}
                <div className={styles.output}>
                    <>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                <h4>Email</h4>
                            </div>
                            <div className={styles.content}>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                <h4>Полное Имя</h4>
                            </div>
                            <div className={styles.content}>
                                <p>{user?.fullname}</p>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                <h4>Пароль</h4>
                            </div>
                            <div className={styles.content}>
                                <p>••••••••••</p>
                            </div>
                        </div>
                        {user?.role === 'ADMIN' && (
                            <div className={styles.info}>
                                <div className={styles.title}>
                                    <h4>Пользователь</h4>
                                </div>
                                <div className={styles.content}>
                                    <p>Админ</p>
                                </div>
                            </div>
                        )}
                    </>

                    {/* {status === 'loading' && <p>Загрузка...</p>}
                    {status === 'failed' && <p>ОШИБКА: {error}</p>}
                    {status === 'succeeded' && products?.length > 0 ? (
                        <>
                            <Link to={'/add'} className={styles.product}>
                                <div className={styles.image}>
                                    <img src={'add.png'} alt="Recipe" />
                                </div>
                                <div className={styles.title}>
                                    <h3>Новый рецепт</h3>
                                </div>
                            </Link>
                            {products.map((product, index) => (
                                <div key={index} className={styles.product}>
                                    <div className={styles.image}>
                                        <img src={'cat.png'} alt="Recipe" />
                                        <p className={styles.stars}>
                                            <img src={'star.svg'} alt="Recipe" />
                                            {product?.stars}
                                        </p>
                                    </div>
                                    <div className={styles.title}>
                                        <div className={styles.path}>
                                            <h3>{product?.title}</h3>
                                            <h3 className={styles.price}>{product?.price} BYN</h3>
                                        </div>
                                    </div>
                                    <p>{product?.description}</p>
                                    <button onClick={() => handleFavoriteToggle(product.id)}>
                                        Добавить в корзину
                                    </button>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>Товары не найдены</p>
                    )} */}

                    {/* </>
                    )} */}
                    {/* {activeTab === 'favorites' && (
                        <div className={styles.recipes}>
                            {userRecipes?.length > 0
                                ? userRecipes.map((recipe, index) => (
                                      <div key={index} className={styles.recipe}>
                                          <div className={styles.image}>
                                              <img src={'carrot.png'} alt="recipe" />
                                              <p className={styles.time}>{recipe?.time}</p>
                                              <p className={styles.type}>{recipe?.type}</p>
                                          </div>
                                          <div className={styles.title}>
                                              <h3>{recipe?.title}</h3>
                                              <div className={styles.path}>
                                                  <img
                                                      src={
                                                          likedRecipes.includes(recipe.id)
                                                              ? 'noliked.svg'
                                                              : 'liked.svg'
                                                      }
                                                      onClick={() =>
                                                          handleFavoriteToggle(recipe.id)
                                                      }
                                                      alt="not liked"
                                                  />
                                              </div>
                                          </div>
                                          <p>{recipe?.description}</p>
                                      </div>
                                  ))
                                : 'Нет данных'}
                        </div>
                    )} */}
                </div>
            </div>
        </Layout>
    );
};
