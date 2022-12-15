import cn from "classnames";
import { Link } from "react-router-dom";

import s from "./index.module.css";

import { ROUTELINKFAVORITES } from "../../Constant/Constant";

export default function Header({children, userData, favorites}){
    
    const favoriteCount = favorites?.length;

    return( 
        <header className={cn(s.header, "content")}>
            <div className={s.header__content}>
                {children}
               {userData?.email && <span>{userData?.name}</span>}
               <Link to={ROUTELINKFAVORITES} className={s.header__link}>◙
               {!!favoriteCount && <span className="favorite__count">{favoriteCount}</span>}
               </Link>

               <Link to="?login=true">Вход</Link>
            </div>
            
        </header>
    )
}