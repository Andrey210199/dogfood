import cn from "classnames";

import s from "./index.module.css";
import isLike from "../../Utilites/IsLike.js";
import { createMarkup, scrollClear } from "../../Utilites/Product.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import ContentHeader from "../ContentHeader/ContentHeader";
import Rating from "../Rating/Rating";
import { useMemo } from "react";
import FormReview from "../FormReview/FormReview";
import { useState } from "react";
import { useEffect } from "react";

export default function Page({name, description, price, discount, reviews, likes, pictures, stock, tags, wight, _id: id, handleLike, setProduct }){
    const {user} = useContext(GlobalContext);
    const [review, setReview] = useState(reviews);
    const discountPrice =  Math.round(price - price * discount/100);
    const like = likes && isLike(likes, user?._id);
    const descriptionHTML = createMarkup(description);
    const navigate = useNavigate();

    const rating = useMemo(()=>Math.round(reviews?.reduce((acc, curr)=> acc+=curr.rating, 0)/reviews?.length), [reviews]);

    useEffect(()=>{
        scrollClear();
    },[])


    function handleClickLike(){
        handleLike(likes);
    }

    return(
        <div className="main__content">
            <div className="title">
                <ContentHeader title={name}>
                <span><Rating rating={rating}/> {!!rating ? rating : 0} </span>
                <span>Артикул: <b>{wight}</b></span>
                </ContentHeader>
            </div>

            <div className={s.product}>
                <div className={s.poduct_left}>
                    {!!discount &&  
                        <div className={cn( !!discount? "card__stickys": "card__sticky", "top__sticky")}>
                            <div className="discount">{`-${discount}%`}</div>
                        </div>
                    }
                    
                    <img src={pictures}/>
                </div>

                <div className={s.product_right}>

                     <div className={!!discount ? s.oldPrice: s.price}>{price}</div>
                     {!!discount && <div className={s.discountPrice}>{discountPrice}</div>}

                     <div className={s.wight}>
                        <button className="btn minus">-</button>
                        <span>0</span>
                        <button className="btn plus">+</button>
                     </div>

                     <button className={cn("card__favorite", {"card__favorite_active": like} )} onClick={handleClickLike}>
                        <span className="card__favorite-icon"> ♥</span>
                    </button>

                    <div className={s.delivery}>
                        <img src="#" alt="truck"/>
                        <div className={s.right}>
                            <h3 className={s.name}>Доставка по всему Миру!</h3>
                            <p className ={s.name}>Доставка курьером — 
                            <span className={s.bold}>от 300 Р</span></p>
                        </div>

                    </div>

                    <div className={s.delivery}>
                        <img src="#" alt="quality"/>
                        <div className={s.right}>
                            <h3 className={s.name}>Доставка по всему Миру!</h3>
                            <p className ={s.name}>Доставка курьером — 
                            <span className={s.bold}>от 300 Р</span></p>
                        </div>
                    </div>

                </div>

            </div>

            <div className={s.box}>

                <h2 className={s.title}>Описание</h2>
                <p className={s.subTitle} dangerouslySetInnerHTML={descriptionHTML}></p>
                <h2 className={s.title}>Характеристики</h2>
                <div className={s.grid}>
					<div className={s.naming}>Вес</div>
					<div className={s.description}>1 шт 120-200 грамм</div>
					<div className={s.naming}>Цена</div>
					<div className={s.description}>490 ₽ за 100 грамм</div>
					<div className={s.naming}>Польза</div>
					<div className={s.description}>
						<p>
							Большое содержание аминокислот и микроэлементов оказывает
							положительное воздействие на общий обмен веществ собаки.
						</p>
						<p>Способствуют укреплению десен и жевательных мышц.</p>
						<p>
							Развивают зубочелюстной аппарат, отвлекают собаку во время смены
							зубов.
						</p>
						<p>
							Имеет цельную волокнистую структуру, при разжевывание получается
							эффект зубной щетки, лучше всего очищает клыки собак.
						</p>
						<p>Следует учесть высокую калорийность продукта.</p>
					</div>
				</div>
			</div>
            
            <div className={s.review}>
                <FormReview title={`Отзыв о ${name}`}  productId={id} setReview={setReview} setProduct={setProduct}/>
                <ul className={s.comments}>
                    {reviews?.map(comment => <li key={comment._id} className={s.comment}> <Rating rating={comment.rating}/> {comment.text}</li>)}
                </ul>
            </div>

        </div>
    )
}