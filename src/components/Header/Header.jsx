import cn from "classnames";
import { Link } from "react-router-dom";
import { ReactComponent as LikeImg } from "./like.svg";

import s from "./index.module.css";

import { ROUTELINKFAVORITES } from "../../Constant/Constant";
import { useSelector } from "react-redux";
import { getCookie } from "../../Utilites/Cookie";
import { unAutch } from "../../Storage/Slices/UserSlice";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";

export default function Header({ children }) {

    const userToken = getCookie("token");
    const userData = useSelector(state => state.user.data);
    const favorites = useSelector(state => state.products.favorites);
    const favoriteCount = favorites?.length;

    return (
        <header className={cn(s.header, "content")}>
            <div className={s.header__content}>
                {children}

                {userToken ?
                    <div className={s.user}>
                    <Link to={ROUTELINKFAVORITES} className={s.header__link}><LikeImg className={s.header__favorite}/>
                    {!!favoriteCount && <span className={s.header__link__count}>{favoriteCount}</span>}
                </Link>
                        <span className={s.user__name}>{userData?.name}</span>
                        <ButtonLink onClick={unAutch}>Выход</ButtonLink>
                    </div>

                    : <ButtonLink navText="?login=true">Вход</ButtonLink>
                }


            </div>

        </header>
    )
}