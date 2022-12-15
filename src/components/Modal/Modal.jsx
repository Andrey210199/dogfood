import { useNavigate } from "react-router-dom";
import s from "./index.module.css";

export default function Modal({children}){
    
    const navigate = useNavigate();

    return(
        <div className={s.modal} onClick={()=> navigate(-1)}>
            <div className={s.modal__content} onClick = {(e)=> e.stopPropagation()}>
                {children}
            </div>

        </div>
    )
}