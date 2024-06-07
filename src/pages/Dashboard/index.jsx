import { useDispatch, useSelector } from 'react-redux';
// import products from '../../products.json';

import { Layout } from '../../components/Layout/Layout';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { createProduct, deleteProduct, fetchProducts } from '../../redux/slices/product';
import styles from './Dashboard.module.scss';
import { useEffect } from 'react';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.goods);
    const status = useSelector((state) => state.product.status);
    // const basket = useSelector((state) => state.product.basket);
    const error = useSelector((state) => state.product.error);

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            category: '',
            type: '',
            price: '',
            stars: '',
            image: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        console.log(values);
        const add = {
            title: values.title || '',
            description: values.description || '',
            category: values.category?.value || '',
            type: values.type?.value || '',
            price: values.price || 0, // Convert price to float
            stars: values.stars?.value || '',
            image: values.image[0], // Handle file input correctly
        };
        console.log(add);

        const data = await dispatch(createProduct(add));

        if (!data.payload) {
            return alert('Не удалось создать рецепт');
        }
    };

    const starsOptions = ['1', '2', '3', '4', '5'];

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
        <Layout title={'Панель управления'}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                <h2>Создание товара</h2>
                <div className={styles.formContent}>
                    <div className={styles.inputs}>
                        <label htmlFor="title">Название</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Введите название рецепта"
                            aria-invalid={errors.title ? true : false}
                            {...register('title', { required: 'Укажите название' })}
                        />
                        <p className={styles.error}>{errors.title?.message}</p>

                        <label htmlFor="description">Описание</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Введите описание продукта"
                            aria-invalid={errors.description ? true : false}
                            {...register('description', { required: 'Укажите описание' })}
                        />
                        <p className={styles.error}>{errors.description?.message}</p>
                    </div>

                    <div className={styles.more}>
                        <div className={styles.selects}>
                            <div>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Категория"
                                            options={categorySortOptions.map((option) => ({
                                                value: option,
                                                label: option,
                                            }))}
                                        />
                                    )}
                                    rules={{ required: 'Выберите категорию' }}
                                />
                                {errors.category && <span>{errors.category.message}</span>}
                            </div>

                            <div>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Тип товара"
                                            options={typeSortOptions.map((option) => ({
                                                value: option,
                                                label: option,
                                            }))}
                                        />
                                    )}
                                    rules={{ required: 'Выберите тип' }}
                                />
                                {errors.type && <span>{errors.type.message}</span>}
                            </div>

                            <div>
                                <Controller
                                    name="stars"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Качество"
                                            options={starsOptions.map((option) => ({
                                                value: option,
                                                label: option,
                                            }))}
                                        />
                                    )}
                                    rules={{ required: 'Выберите качество' }}
                                />
                                {errors.stars && <span>{errors.stars.message}</span>}
                            </div>
                        </div>

                        <label htmlFor="price">Цена</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Введите цену товара"
                            aria-invalid={errors.price ? true : false}
                            {...register('price', {
                                required: 'Укажите цену товара',
                                valueAsNumber: true,
                            })}
                        />
                        <p className={styles.error}>{errors.price?.message}</p>

                        <label htmlFor="image">Загрузить изображение</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            {...register('image', { required: 'Загрузите изображение' })}
                        />
                        <p className={styles.error}>{errors.image?.message}</p>
                    </div>
                </div>
                <button type="submit">Добавить продукт</button>
            </form>
            <div className={styles.products}>
                {status === 'loading' && <p>Загрузка...</p>}
                {status === 'failed' && <p>ОШИБКА: {error}</p>}
                {status === 'succeeded' && products?.length > 0 ? (
                    <>
                        {products.map((product, index) => (
                            <div key={index} className={styles.product}>
                                <div className={styles.image}>
                                    <img
                                        src={`http://localhost:4000/uploads/${product.image}`}
                                        alt="product"
                                    />
                                    <p className={styles.stars}>
                                        <img src={'star.svg'} alt="product" />
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

                                <button onClick={() => handleDeleteProduct(product.id)}>
                                    Удалить товар
                                </button>

                                {/* <button
                                onClick={() => handleAddToBasket(product.id)}
                                disabled={isProductInBasket(product.id)}>
                                {isProductInBasket(product.id) ? 'Добавлено' : 'Добавить в корзину'}
                            </button> */}
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Товары не найдены</p>
                )}
            </div>
        </Layout>
    );
};
