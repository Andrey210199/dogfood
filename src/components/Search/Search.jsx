import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {ROUTELINKHOME} from "../../Constant/Constant.js";
import s from "./index.module.css";

export default function Search({onInput, onSubmit}){

    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    function handleInput(evt){
        setInputText(evt.target.value);
        onInput && onInput(evt.target.value);
    }
    
    function clearInput(){
        setInputText("");
        onInput && onInput("");
    }

    function handleSubmit(evt){
        evt.preventDefault();
        navigate(ROUTELINKHOME);
        onSubmit();
    }



    return( 
        <form action="" className="search" onSubmit={handleSubmit}>
            <input type="text" value={inputText} className={s.search__input} placeholder="Поиск" onInput={handleInput}/>

            <button type="button" className="btn clear__btn" onClick={clearInput}>Очистить</button>
            <button type="submit" className="btn search__btn">Найти</button>
        </form>
    )
}