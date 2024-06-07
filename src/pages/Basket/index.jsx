import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import styles from './Basket.module.scss';
import { selectUser } from '../../redux/slices/auth';
import { toggleBasketProduct } from '../../redux/slices/auth';

export const Basket = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const user = useSelector(selectUser);

    const [totalSum, setTotalSum] = useState(0);

    const usersGoodsInBaskets = user?.baskets;

    const handleGoodsInBasketsToggle = (productId) => {
        dispatch(toggleBasketProduct({ goodsId: productId }));
    };

    useEffect(() => {
        const calculateTotalSum = () => {
            const sum = usersGoodsInBaskets.reduce(
                (acc, product) => acc + Number(product.price),
                0,
            );
            setTotalSum(sum);
        };

        calculateTotalSum();
    }, [usersGoodsInBaskets]);

    return (
        <Layout title={'Корзина товаров'}>
            <div className={styles.basket}>
                <h1>Корзина </h1>
                <div className={styles.check}>
                    <h2>Cумма</h2>

                    <div></div>

                    <h3>{totalSum}&nbsp;Byn</h3>
                </div>
                <div className={styles.products}>
                    {usersGoodsInBaskets?.length > 0
                        ? usersGoodsInBaskets.map((product, index) => (
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

                                  {console.log(product.id)}
                                  <button onClick={() => handleGoodsInBasketsToggle(product.id)}>
                                      Удалить из корзины
                                  </button>
                                  {/* <button
                                    onClick={() => handleAddToBasket(product.id)}
                                    disabled={isProductInBasket(product.id)}>
                                    {isProductInBasket(product.id) ? 'Добавлено' : 'Добавить в корзину'}
                                </button> */}
                              </div>
                          ))
                        : 'Нет данных'}
                </div>
            </div>
        </Layout>
    );
};
