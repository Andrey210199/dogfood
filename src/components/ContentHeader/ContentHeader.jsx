import cn from "classnames";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import s from "./index.module.css";

export default function ContentHeader({title, children}){

    const navigate = useNavigate();

    const handleClickBack = ()=> navigate(-1);

    return(
        <>
        <a href="#" className={ cn(s.title__link, "btn")} onClick={handleClickBack}>Назад</a>
        <h1>{title}</h1>
        {children}
        </>
    )
}