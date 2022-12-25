import cn from "classnames";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import isLike from "../../Utilites/IsLike";
import { ROUTELINKPRODUCT } from "../../Constant/Constant.js";
import { fetchChangeLike } from "../../Storage/Slices/ProductsSlice";

import "./styles.css";
import { getCookie } from "../../Utilites/Cookie";



export default function Card(props) {

    const { name, price, discount, wight, description, pictures: picture, likes, _id: id } = props;
    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    const discountPrise = Math.round(price - price * discount / 100);

    function handleClickLike() {
        dispatch(fetchChangeLike(props));
    }

    const like = isLike(likes, user?._id);

    return (
        <div className="card">

            <div className={cn(!!discount ? "card__stickys" : "card__sticky", "top__sticky")}>

                {!!discount && <div className="card__sticky_left">
                    <span className="discount">{`-${discount}%`}</span>
                </div>}

                <div className="card__sticky_right">

                    {getCookie("token") && <button className={cn("card__favorite", { "card__favorite_active": like})} onClick={handleClickLike}>
                        <span className="card__favorite-icon"> ♥</span>
                    </button>}
                </div>

            </div>

            <Link to={ROUTELINKPRODUCT + id} className="card__link">

                <img src={picture} alt={description} className="card__img" />
                <span className={!!discount ? "card__old-price" : "card__price"}>{price}</span>
                {!!discount && <span className="card__price_discount">{discountPrise}</span>}

                <span className="card__wight">{wight}</span>
                <p className="card__name">{name}</p>

            </Link>

            <a href="/#" className="card__cart btn">В корзину</a>
        </div>
    )
}