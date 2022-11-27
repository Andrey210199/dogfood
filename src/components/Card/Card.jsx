import cn from "classnames";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../../Context/PageContext";
import { GlobalContext } from "../../Context/GlobalContext";

import isLike from "../../Utilites/IsLike";
import { ROUTELINKPRODUCT} from "../../Constant/Constant.js";
import "./styles.css";

export default function Card({name, price, discount, wight, description, pictures: picture, likes, _id: id}){
    const {user} = useContext(GlobalContext);
    const {handleLike} = useContext(PageContext);
    const discountPrise = Math.round(price - price * discount/100);

    function handleClickLike(){
        handleLike(id,likes);
    }

    const like = isLike(likes, user?._id);

    return( 
        <div className="card">

            <div className={cn( !!discount? "card__stickys": "card__sticky", "top__sticky")}>

               {!!discount && <div className="card__sticky_left">
                    <span className="discount">{`-${discount}%`}</span>
                </div>}
            
                <div className="card__sticky_right">

                    <button className={cn("card__favorite", {"card__favorite_active": like} )} onClick={handleClickLike}>
                        <span className="card__favorite-icon"> ♥</span>
                    </button>
                </div>

            </div>

            <Link to={ROUTELINKPRODUCT+id} className="card__link">

                <img src={picture} alt={description} className="card__img"/>
                <span className={!!discount ? "card__old-price": "card__price"}>{price}</span>
                {!!discount && <span className="card__price_discount">{discountPrise}</span>}

                <span className="card__wight">{wight}</span>
                <p className="card__name">{name}</p>

            </Link>

            <a href="#" className="card__cart btn">В корзину</a>
        </div>
    )
}