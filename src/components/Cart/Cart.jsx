import { useDispatch } from "react-redux";
import { deleteCart } from "../../Storage/Slices/CartSlice";
import ButtonCount from "../ButtonCount/ButtonCount"
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
            <img src={pictures} className={s.cart__img} />
            <div>
                <h3>{name}</h3>
                <ButtonCount {...props} />
                <Price discount={discount} price={price} />
                <button onClick={handleClick}>delete</button>
            </div>
        </div>
    )
}