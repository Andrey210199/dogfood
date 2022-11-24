import s from "./index.module.css";
import { ReactComponent as Loader } from "./circle.svg";

export default function Spiner(){
    return(
        <div className={s.content}>
            <Loader className={s.spiner}/>
        </div>

    )
}
