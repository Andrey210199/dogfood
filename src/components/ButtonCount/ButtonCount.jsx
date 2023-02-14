
import { useDispatch, useSelector } from "react-redux";
import { addCart, setCountCart } from "../../Storage/Slices/CartSlice";
import s from "./index.module.css";

export default function ButtonCount(props) {

    const count = useSelector(state => state.cart.data[props._id]?.quality);
    const dispatch = useDispatch();

    function handleDecClick() {
        if (count > 1) {
            dispatch(setCountCart({ id: props._id, quality: count - 1 }));
        }
    }

    function handleIncreClick() {
        if (!count) {
            dispatch(addCart({ ...props }));
        }
        else if (count > 0) {
            dispatch(setCountCart({ id: props._id, quality: count + 1 }));
        }
    }

    return (
        <div className={s.wrap}>
            <button className={s.wrap__btn} onClick={handleDecClick}>-</button>
            <span>{count ? count : "0"}</span>
            <button className={s.wrap__btn} onClick={handleIncreClick}>+</button>
        </div>

    )
}