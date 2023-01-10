import cn from "classnames";
import { ReactComponent as LikeImg } from "./like.svg";
import s from "./index.module.css";
import { getCookie } from "../../../Utilites/Cookie";

export default function ButtonLike({handleClickLike, like}){
    
    return(
        <>
        {getCookie("token") && <button className={cn(s.favorite, { [s.favorite_active]: like })} onClick={handleClickLike}>
                        <LikeImg className="card__favorite-icon"/>
                    </button>}
        </>
    )
}