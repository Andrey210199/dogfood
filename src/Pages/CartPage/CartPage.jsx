import { useSelector } from "react-redux";
import AllPrice from "../../components/AllPrice/AllPrice";
import Cart from "../../components/Cart/Cart";
import ContentHeader from "../../components/ContentHeader/ContentHeader";

import s from "./index.module.css";

export default function CartPage() {

    const products = useSelector(state => state.cart.data);
    return (
        <div className={s.cart}>
            <ContentHeader title="Корзина" />
            <div className={s.cart__content}>
                <div className={s.cart__item}>
                {Object.values(products)?.map(product => <Cart key={product._id} {...product} />)}
                </div>
                <div className={s.cart__price}>
                <AllPrice {...products} />
                </div>
            </div>
        </div>
    )
}