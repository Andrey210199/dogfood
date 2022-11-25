import s from "./index.module.css";

import { Link } from "react-router-dom";

export default function NotFound({error}){
    return(
       <div className={s.content}>
            <h1>{error ? error: "Ошибка: 404"}</h1>
            <Link to="/" className="btn">На Главную</Link>
       </div>
    )
}