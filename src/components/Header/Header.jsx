import cn from "classnames";
import { Link } from "react-router-dom";

import s from "./index.module.css";

import { ROUTELINKFAVORITES } from "../../Constant/Constant";
import { useSelector } from "react-redux";
import { getCookie } from "../../Utilites/Cookie";
import { unAutch } from "../../Storage/Slices/UserSlice";

export default function Header({ children }) {

    const userToken = getCookie("token");
    const userData = useSelector(state => state.user.data);
    const favorites = useSelector(state => state.products.favorites);
    const favoriteCount = favorites?.length;

    return (
        <header className={cn(s.header, "content")}>
            <div className={s.header__content}>
                {children}

                { getCookie("token") &&  <Link to={ROUTELINKFAVORITES} className={s.header__link}>◙
                    {!!favoriteCount && <span className="favorite__count">{favoriteCount}</span>}
                </Link>}
                {userToken ?
                    <>
                        <span>{userData?.name}</span>
                        <Link to="/" onClick={unAutch}>Выход</Link>

                    </>
                    : <Link to="?login=true">Вход</Link>
                }


            </div>

        </header>
    )
}