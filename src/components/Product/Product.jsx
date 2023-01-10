
import s from "./index.module.css";
import isLike from "../../Utilites/IsLike.js";
import { createMarkup, scrollClear } from "../../Utilites/Product.js";
import ContentHeader from "../ContentHeader/ContentHeader";
import Rating from "../Rating/Rating";
import { useMemo } from "react";
import FormReview from "../FormReview/FormReview";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeLike } from "../../Storage/Slices/ProductsSlice";
import { setProductState } from "../../Storage/Slices/SingleProductSlice";
import {ReactComponent as Truck} from "./img/truck.svg";
import {ReactComponent as Medal} from "./img/medal.svg";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";
import { getCookie } from "../../Utilites/Cookie";
import Price from "../Price/Price";
import DiscountTag from "../DiscountTag/DiscountTag";
import ButtonLike from "../Buttons/ButtonLike/ButtonLike";

export default function Page() {
    const user = useSelector(state => state.user.data);
    const product = useSelector(state => state.singleProduct.data);
    const { name, description, price, discount, reviews, likes, pictures, _id: id } = product;;
    const like = likes && isLike(likes, user?._id);
    const descriptionHTML = createMarkup(description);
    const dispatch = useDispatch();

    const rating = useMemo(() => Math.round(reviews?.reduce((acc, curr) => acc += curr.rating, 0) / reviews?.length), [reviews]);

    useEffect(() => {
        scrollClear();
    }, [])


    function handleClickLike() {
        dispatch(fetchChangeLike(product))
            .then(updateProduct => dispatch(setProductState(updateProduct.payload.data)));

    }

    return (
        <div className="main__content">
            <div className="title">
                <ContentHeader title={name}>
                    <span><Rating rating={rating} /> {!!rating ? rating : 0} </span>
                    <span>Артикул: <b>001</b></span>
                </ContentHeader>
            </div>

            <div className={s.product}>
                <div className={s.poduct_left}>
                    <DiscountTag discount={discount}/>

                    <img src={pictures} alt="Изображение товара" />
                </div>

                <div className={s.product_right}>

                    <Price price={price} discount={discount}/>

                    <div className={s.wight}>
                        <ButtonLink>-</ButtonLink>
                        <span>0</span>
                        <ButtonLink>+</ButtonLink>
                    </div>

                    <ButtonLike like={like} handleClickLike={handleClickLike}/>

                    <div className={s.delivery}>
                        <Truck/>
                        <div className={s.right}>
                            <h3 className={s.name}>Доставка по всему Миру!</h3>
                            <p className={s.name}>Доставка курьером —
                                <span className={s.bold}>от 300 Р</span></p>
                        </div>

                    </div>

                    <div className={s.delivery}>
                        <Medal/>
                        <div className={s.right}>
                            <h3 className={s.name}>Доставка по всему Миру!</h3>
                            <p className={s.name}>Доставка курьером —
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
                {getCookie("token") ? <FormReview title={`Отзыв о ${name}`} productId={id} />
                : <span>Комментарии могут оставлять только авторизованые пользователи.</span>}
                <ul className={s.comments}>
                    {reviews?.map(comment => <li key={comment._id} className={s.comment}> <Rating rating={comment.rating} /> {comment.text}</li>)}
                </ul>
            </div>

        </div>
    )
}