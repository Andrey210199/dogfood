import { Link } from "react-router-dom";

import s from "./index.module.css";

export default function ButtonLink({children, onClick, navText="/#"}){

    function handleClick(e){
        onClick && onClick(e);
    }
    
    return(
        <Link to={navText} className={s.btn__form} onClick={handleClick}>{children}</Link>
    )
}