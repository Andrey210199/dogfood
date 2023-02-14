import cn from "classnames";
import { Link } from "react-router-dom";
import { ReactComponent as LikeImg } from "./img/like.svg";
import { ReactComponent as CartImg } from "./img/cart.svg";

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
    const count = useSelector(state => state.cart.data);

    return (
        <header className={cn(s.header, "content")}>
            <div className={s.header__content}>
                {children}

               
                    <div className={s.user}>
                    {userToken &&  <Link to={ROUTELINKFAVORITES} className={s.header__link}><LikeImg className={s.header__favorite} />
                            {!!favoriteCount && <span className={s.header__link__count}>{favoriteCount}</span>}
                        </Link> }

                        <Link to="/cart" className={s.header__link}><CartImg />{<span className={s.header__link__count}>{Object.keys(count).length}</span>}</Link>

                      {userToken &&
                      <>
                       <span className={s.user__name}>{userData?.name}</span>
                        <ButtonLink onClick={unAutch}>Выход</ButtonLink>
                      </> }
                      {!userToken && <ButtonLink navText="?login=true">Вход</ButtonLink>}
                    </div>


                


            </div>

        </header>
    )
}