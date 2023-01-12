
import s from "./index.module.css";
import isLike from "../../Utilites/IsLike.js";
import { createMarkup, scrollClear } from "../../Utilites/Product.js";
import ContentHeader from "../ContentHeader/ContentHeader";
import Rating from "../Rating/Rating";
import { useMemo, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";

import FormReview from "../FormReview/FormReview";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeLike } from "../../Storage/Slices/ProductsSlice";
import { setProductState } from "../../Storage/Slices/SingleProductSlice";
import { ReactComponent as Truck } from "./img/truck.svg";
import { ReactComponent as Medal } from "./img/medal.svg";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";
import { getCookie } from "../../Utilites/Cookie";
import Price from "../Price/Price";
import DiscountTag from "../DiscountTag/DiscountTag";
import ButtonLike from "../Buttons/ButtonLike/ButtonLike";
import Spiner from "../Spiner/Spiner";

dayjs.locale("ru");
dayjs.extend(relativeTime);

export default function Page() {
    const user = useSelector(state => state.user.data);
    const produtcState = useSelector(state => state.singleProduct);
    const product = produtcState.data;
    const { name, description, price, discount, reviews, likes, pictures, _id: id } = product;
    const { comments, commentsLoading } = produtcState;
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
        <div className={s.main}>
            <div className={s.main__title}>
                <ContentHeader title={name}>
                    <div className={s.main__content}>
                        <span className={s.rating}><Rating rating={rating} /> <b className={s.rating__count}>{!!rating ? rating : 0}</b> </span>
                        <span>Артикул: <b>001</b></span>
                    </div>
                </ContentHeader>
            </div>

            <div className={s.product}>
                <div className={s.poduct_left}>
                    <DiscountTag discount={discount} />

                    <img src={pictures} className={s.product__img} alt="Изображение товара" />
                </div>

                <div className={s.product_right}>

                    <Price price={price} discount={discount} />

                    <div className={s.wight}>
                        <ButtonLink>-</ButtonLink>
                        <span>0</span>
                        <ButtonLink>+</ButtonLink>
                    </div>

                    <ButtonLike like={like} handleClickLike={handleClickLike} />
                    <span>{like ? "В избранном" : "В избранное"}</span>

                    <div className={s.delivery}>
                        <Truck className={s.delivery__left} />
                        <div className={s.delivery__right}>
                            <h3 className={s.delivery__name}>Доставка по всему Миру!</h3>
                            <p className={s.delivery__name}>Доставка курьером —
                                <span className={s.delivery__bold}>от 300 Р</span></p>
                        </div>

                    </div>

                    <div className={s.delivery}>
                        <Medal className={s.delivery__left} />
                        <div className={s.delivery__right}>
                            <h3 className={s.delivery__name}>Доставка по всему Миру!</h3>
                            <p className={s.delivery__name}>Доставка курьером —
                                <span className={s.delivery__bold}>от 300 Р</span></p>
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
                    : <b className={s.review__text}>Комментарии могут оставлять только авторизованые пользователи.</b>}
                {commentsLoading ? <Spiner />
                    : <ul className={s.comments}>
                        {comments?.map(comment => <li key={comment._id} className={s.comment}> <span><b>{comment.author.name}</b> {dayjs(comment.created_at).fromNow()}</span> <Rating rating={comment.rating} /> {comment.text}</li>)}
                    </ul>}
            </div>

        </div>
    )
}