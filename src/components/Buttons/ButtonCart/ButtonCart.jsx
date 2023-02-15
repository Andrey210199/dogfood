import { useDispatch, useSelector } from "react-redux";
import { addCart, setCountCart } from "../../../Storage/Slices/CartSlice";
import Button from "../Button/Button";

export default function ButtonCart({ product }) {

    const { _id: id } = product;
    const count = useSelector(state => state.cart.data[id]?.quality);
    const dispatch = useDispatch()

    function handleAddCart() {
        if (!count) {
            dispatch(addCart({ ...product }));
        }
        else {
            dispatch(setCountCart({ id, quality: count + 1 }))
        }
    }

    return (
        <Button onClick={handleAddCart}>{count ? "В корзине" : "В корзину"}</Button>
    )
}