
import s from "./index.module.css";

export default function ButtonForm({children, onClick, type="submit"}){

    function handleClick(e){
       onClick && onClick(e);
    }

    return(
        <button type={type} className={s.btn__form} onClick={handleClick}>{children}</button>
    )
}