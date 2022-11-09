import cn from "classnames";

import "./styles.css";

export function Card({name, price, discount, wight, description, picture}){

    const discountPrise = Math.round(price - price * discount/100);

    return( 
        <div className="card">

            <div className={cn( !!discount? "card__stickys": "card__sticky", "top__sticky")}>

               {!!discount && <div className="card__sticky_left">
                    <span className="discount">{`-${discount}%`}</span>
                </div>}
            
                <div className="card__sticky_right">

                    <button className="card__favorite">
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