
import cn from "classnames";
import s from "./index.module.css";

export default function DiscountTag({ children, discount }) {

    return (
        <div className={cn(!!discount ? s.card__stickys : s.card__sticky, "top__sticky")}>

            {!!discount && <div className={s.card__sticky_left}>
                <span className={s.discount}>{`-${discount}%`}</span>
            </div>}

            {children}

        </div>
    )
}