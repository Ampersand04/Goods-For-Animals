import { useDispatch, useSelector } from 'react-redux';
// import products from '../../products.json';

import { Layout } from '../../components/Layout/Layout';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { fetchProducts, searchProducts } from '../../redux/slices/product';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import { toggleBasketProduct } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';

export const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.goods);
    const status = useSelector((state) => state.product.status);
    const error = useSelector((state) => state.product.error);
    // const basket = useSelector((state) => state.auth.user?.basket);

    // const [favoriteStatus, setFavoriteStatus] = useState({});

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            query: '',
            categorySort: [],
            typeSort: [],
        },
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const onSubmit = (formData) => {
        console.log(formData);
        const searchPayload = {
            query: formData.query || '',
            categorySort: formData.categorySort.map((option) => option.value),
            typeSort: formData.typeSort.map((option) => option.value),
        };
        console.log(searchPayload);

        dispatch(searchProducts(searchPayload));
    };

    const handleAddToBasket = (productId) => {
        dispatch(toggleBasketProduct({ goodsId: productId }));
    };
    const categorySortOptions = ['Для кошек', 'Для собак', 'Для грызунов', 'Для птиц', 'Для рыбок'];

    const typeSortOptions = [
        'Корм сухой',
        'Корм влажный',
        'Лакомство',
        'Одежда для животных',
        'Игрушка для животных',
        'Топпер',
    ];

    return (
        <Layout title={'Товары для животных'}>
            {/* <div className={styles.search}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <input type="text" name="" id="" placeholder="wefewf" />
                </form>
                <div className={styles.filter}>wefwefewfewr</div>
                <div className={styles.products}>wefweff</div>
            </div> */}

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.searchPath}>
                    <input
                        className={styles.search}
                        {...register('query')}
                        placeholder="Поиск по названию"
                    />
                    {errors.query && <span>{errors.query.message}</span>}
                    {/* <button type="button" onClick={toggleFilter}>
                        Фильтр
                    </button> */}
                    <button type="submit">
                        <img src="search-white.svg" width={20} alt="" />
                    </button>
                </div>

                <div className={styles.filter}>
                    <div>
                        <Controller
                            name="categorySort"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Категория"
                                    options={categorySortOptions.map((option) => ({
                                        value: option,
                                        label: option,
                                    }))}
                                    isMulti
                                />
                            )}
                            // rules={{ required: 'Выберите время приготовления' }}
                        />
                        {errors.timeSort && <span>{errors.timeSort.message}</span>}
                    </div>

                    <div>
                        <Controller
                            name="typeSort"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Тип товара"
                                    options={typeSortOptions.map((option) => ({
                                        value: option,
                                        label: option,
                                    }))}
                                    isMulti
                                />
                            )}
                            // rules={{ required: 'Выберите тип' }}
                        />
                        {errors.typeSort && <span>{errors.typeSort.message}</span>}
                    </div>
                </div>
            </form>

            <div className={styles.products}>
                {status === 'loading' && <p>Загрузка...</p>}
                {status === 'failed' && <p>ОШИБКА: {error}</p>}
                {status === 'succeeded' && products?.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className={styles.product}>
                            <Link to={`/product/${product.id}`} className={styles.image}>
                                <img
                                    // src={`http://localhost:4000/uploads/${product.image}`}
                                    src={`https://api-goods-for-animals.onrender.com/uploads/${product.image}`}
                                    alt="product"
                                />
                                <p className={styles.stars}>
                                    <img src={'star.svg'} alt="product" />
                                    {product?.stars}
                                </p>
                            </Link>
                            <div className={styles.title}>
                                <div className={styles.path}>
                                    <h3>{product?.title}</h3>
                                    <h3 className={styles.price}>{product?.price} BYN</h3>
                                </div>
                            </div>
                            <p>{product?.description}</p>

                            {/* <button>Добавить в корзину</button> */}

                            <button onClick={() => handleAddToBasket(product.id)}>
                                Добавить в корзину
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Товары не найдены</p>
                )}
            </div>
        </Layout>
    );
};
