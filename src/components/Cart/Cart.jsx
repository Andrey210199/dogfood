import { useDispatch } from "react-redux";
import { deleteCart } from "../../Storage/Slices/CartSlice";
import ButtonCount from "../ButtonCount/ButtonCount"
import Button from "../Buttons/Button/Button";
import Price from "../Price/Price"

import s from "./index.module.css";

export default function Cart(props) {

    const { pictures, discount, name, price } = props;
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(deleteCart(props._id))
    }

    return (
        <div className={s.cart}>
            <img src={pictures} className={s.cart__img} alt="product" />
            <div className={s.cart__info}>
                <h3 className={s.cart__name}>{name}</h3>
                <ButtonCount {...props} />
                <div className={s.cart__price}>
                    <Price discount={discount} price={price} />
                </div>
            </div>
            <Button onClick={handleClick}>delete</Button>
        </div>
    )
}