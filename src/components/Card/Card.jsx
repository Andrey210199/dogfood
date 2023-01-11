
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import isLike from "../../Utilites/IsLike";
import { ROUTELINKPRODUCT } from "../../Constant/Constant.js";
import { fetchChangeLike } from "../../Storage/Slices/ProductsSlice";

import s from "./index.module.css";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";
import Price from "../Price/Price";
import DiscountTag from "../DiscountTag/DiscountTag";
import ButtonLike from "../Buttons/ButtonLike/ButtonLike";



export default function Card(props) {

    const { name, price, discount, wight, description, pictures: picture, likes, _id: id } = props;
    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();

    function handleClickLike() {
        dispatch(fetchChangeLike(props));
    }

    const like = isLike(likes, user?._id);

    return (
        <div className={s.card}>

            <DiscountTag discount={discount}>
                <div className={s.card__sticky_right}>

                    <ButtonLike handleClickLike={handleClickLike} like={like} />
                </div>
            </DiscountTag>

            <Link to={ROUTELINKPRODUCT + id} className={s.card__link}>

                <img src={picture} alt={description} className={s.card__img} />
                <Price price={price} discount={discount} />

                <span className={s.card__wight}>{wight}</span>
                <p className={s.card__name}>{name}</p>

            </Link>

            <ButtonLink>В корзину</ButtonLink>
        </div>
    )
}