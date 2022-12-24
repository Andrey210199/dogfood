import { ROUTELINKHOME } from "../../Constant/Constant.js";

import s from "./index.module.css";

import { Link } from "react-router-dom";

export default function NotFound({ error }) {

    return (
        <div className={s.content}>
            <h1>{error ? error : "Ошибка: 404"}</h1>
            <Link to={ROUTELINKHOME} className="btn">На Главную</Link>
        </div>
    )
}