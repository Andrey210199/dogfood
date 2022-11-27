import {ROUTELINKHOME} from "../../Constant/Constant.js";

import s from "./index.module.css";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext.js";

export default function NotFound({error}){
    const {setSearch} = useContext(GlobalContext);

    function clearInputState(){
        setSearch("");
    }
    
    return(
       <div className={s.content}>
            <h1>{error ? error: "Ошибка: 404"}</h1>
            <Link to={ROUTELINKHOME} className="btn" onClick={clearInputState}>На Главную</Link>
       </div>
    )
}