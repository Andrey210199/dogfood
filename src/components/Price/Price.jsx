
import s from "./index.module.css";

export default function Price({ discount, price }) {

    const discountPrice = Math.round(price - price * discount / 100);

    return (
        <>
            <div className={!!discount ? s.oldPrice : s.price}>{price}</div>
            {!!discount && <div className={s.discountPrice}>{discountPrice}</div>}
        </>
    )
}