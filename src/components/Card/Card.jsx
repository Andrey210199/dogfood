import cn from "classnames";
import isLike from "../../Utilites/IsLike";

import "./styles.css";

export function Card({name, price, discount, wight, description, pictures: picture, ...props}){
    const {_id: id, likes, handleLike, user} = props;
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

            <a href="#" className="card__link">

                <img src={picture} alt={description} className="card__img"/>
                <span className={!!discount ? "card__old-price": "card__price"}>{price}</span>
                {!!discount && <span className="card__price_discount">{discountPrise}</span>}

                <span className="card__wight">{wight}</span>
                <p className="card__name">{name}</p>

            </a>

            <a href="#" className="card__cart btn">В корзину</a>
        </div>
    )
}