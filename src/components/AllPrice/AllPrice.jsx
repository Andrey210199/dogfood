
import s from "./index.module.css";

export default function AllPrice(props) {

    const price = {
        price: 0,
        quality: 0,
        discount: 0,
        allPrice: 0
    };

    for (let i in props) {
        console.log(props[i].discount)
        price.price += (props[i].price * props[i].quality);
        price.quality += props[i].quality;
        price.allPrice += Math.round(props[i].price - props[i].price * (props[i].discount / 100)) * props[i].quality;
        price.discount = Math.round(((price.price - price.allPrice) / price.price) * 100);
    }

    return (
        <div className={s.cart}>
            <h3 className={s.cart__title}>Ваша корзина</h3>
            <div className={s.cart__price}>{`Товары (${price.quality}): ${price.price}`}</div>
            <div className={s.cart__discount}>Скидка: {price.discount}</div>
            <h4 className={s.cart__allPrice}>Общая стоимость: {price.allPrice}</h4>
            <button>Оформить заказ</button>
        </div>
    )
}