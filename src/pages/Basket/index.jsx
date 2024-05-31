import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import styles from './Basket.module.scss';
import { fetchUser, selectIsAuth } from '../../redux/slices/auth';

export const Basket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(selectIsAuth);

    if (!isAuth) {
        navigate('/');
    }

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <Layout title={'Добавить новый рецепт'}>
            <div className={styles.create}>
                <h1>Корзина товаров</h1>

                <div className={styles.зкщвгсеы}>
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
                                              onClick={() => handleFavoriteToggle(recipe.id)}
                                              alt="not liked"
                                          />
                                      </div>
                                  </div>
                                  <p>{recipe?.description}</p>
                              </div>
                          ))
                        : 'Нет данных'}
                </div>
            </div>
        </Layout>
    );
};
