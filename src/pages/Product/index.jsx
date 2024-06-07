import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout/Layout';
import styles from './Product.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../redux/slices/product';

export const Product = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.product.goods);
    const status = useSelector((state) => state.product.status);
    const error = useSelector((state) => state.product.error);
    const { id } = useParams(); // Извлекаем параметры из URL
    const productId = parseInt(id);
    console.log(id); // Извлекаем параметры из URL

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // Функция для поиска рецепта по id
    const findRecipeById = (products, id) => {
        console.log(products.find((recipe) => recipe.id === id));
        return products.find((recipe) => recipe.id === id);
    };

    // Находим рецепт по переданному id
    const product = findRecipeById(products, productId);

    return (
        <Layout title={'Рецепты для дома'}>
            <div className={styles.product}>
                {status === 'loading' && <p>Загрузка...</p>}
                {status === 'failed' && <p>ОШИБКА: {error}</p>}
                {status === 'succeeded' && products ? (
                    <>
                        <h3>{product.title}</h3>
                        <div className={styles.container}>
                            <div className={styles.image}>
                                <img
                                    // src={`http://localhost:4000/uploads/${product.image}`}
                                    src={`https://api-goods-for-animals.onrender.com/uploads/${product.image}`}
                                    alt={product.title}
                                />
                            </div>
                            <div className={styles.title}>
                                <div className={styles.head}>
                                    <p className={styles.stars}>
                                        <img src={'/star.svg'} alt="product" />
                                        {product?.stars}
                                    </p>
                                    <b>{product?.price} BYN</b>
                                </div>

                                <p>
                                    <b>Описание:</b> {product.description}
                                </p>
                                <p className={styles.about}>
                                    <b>О товаре</b>
                                </p>
                                <>
                                    <div className={styles.info}>
                                        <div className={styles.title}>
                                            <p>Тип</p>
                                        </div>
                                        <div className={styles.content}>
                                            <p>{product?.type}</p>
                                        </div>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.title}>
                                            <p>Категория</p>
                                        </div>
                                        <div className={styles.content}>
                                            <p>{product?.category}</p>
                                        </div>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.title}>
                                            <p>Качество</p>
                                        </div>
                                        <div className={styles.content}>
                                            <p>{product.stars}</p>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Рецепты не найдены</p>
                )}
            </div>
        </Layout>
    );
};
