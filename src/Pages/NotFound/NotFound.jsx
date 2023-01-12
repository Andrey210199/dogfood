import { ROUTELINKHOME } from "../../Constant/Constant.js";

import s from "./index.module.css";
import ButtonLink from "../../components/Buttons/ButtonLink/ButtonLink.jsx";
import { useDispatch } from "react-redux";
import { setSearchState } from "../../Storage/Slices/ProductsSlice.js";

export default function NotFound({ error }) {

    const dispatch = useDispatch();

    function handleClick(){
        dispatch(setSearchState(""));
    }

    return (
        <div className={s.content}>
            <h1>{error ? error : "Ошибка: 404"}</h1>
            <ButtonLink navText={ROUTELINKHOME} onClick={handleClick}>На Главную</ButtonLink>
        </div>
    )
}