import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout/Layout';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { fetchProducts, searchProducts } from '../../redux/slices/product';
import styles from './Home.module.scss';
import { useEffect } from 'react';

export const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.goods);
    const status = useSelector((state) => state.product.status);
    // const basket = useSelector((state) => state.product.basket);
    const error = useSelector((state) => state.product.error);

    // const [favoriteStatus, setFavoriteStatus] = useState({});

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            query: '',
            typeSort: [],
            timeSort: [],
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
            typeSort: formData.typeSort.map((option) => option.value),
            timeSort: formData.timeSort.map((option) => option.value),
        };
        console.log(searchPayload);

        dispatch(searchProducts(searchPayload));
    };

    // const handleAddToBasket = (productId) => {
    //     if (!isProductInBasket(productId)) {
    //         dispatch(toggleBasketProduct(productId));
    //     }
    // };

    // const isProductInBasket = (productId) => {
    //     return basket && basket.some((item) => item.id === productId);
    // };
    const categorySortOptions = [
        '5 мин.',
        '10 мин.',
        '15 мин.',
        '30 мин.',
        '45 мин.',
        '1 час',
        'Более 1 часа',
    ];

    const typeSortOptions = ['Горячее', 'Закуски', 'Десерт', 'Напиток', 'Салат', 'Суп'];

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
                            name="timeSort"
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

            {console.log(products)}

            <div className={styles.products}>
                {status === 'loading' && <p>Загрузка...</p>}
                {status === 'failed' && <p>ОШИБКА: {error}</p>}
                {status === 'succeeded' && products?.length > 0 ? (
                    products.map((product, index) => (
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

                            <button>Добавить в корзину</button>

                            {/* <button
                                onClick={() => handleAddToBasket(product.id)}
                                disabled={isProductInBasket(product.id)}>
                                {isProductInBasket(product.id) ? 'Добавлено' : 'Добавить в корзину'}
                            </button> */}
                        </div>
                    ))
                ) : (
                    <p>Товары не найдены</p>
                )}
            </div>
        </Layout>
    );
};
