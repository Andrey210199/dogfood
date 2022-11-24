import { useState } from "react";
import s from "./index.module.css"

export default function Search({onInput, onSubmit}){

    const [inputText, setInputText] = useState("");

    function handleInput(evt){
        setInputText(evt.target.value);
        onInput && onInput(evt.target.value);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        onSubmit();
        setInputText("");
    }

    function clearInput(){
        setInputText("");
        onInput && onInput("");
    }

    return( 
        <form action="" className="search" onSubmit={handleSubmit}>
            <input type="text" value={inputText} className={s.search__input} placeholder="Поиск" onInput={handleInput}/>

            <button type="button" className="btn clear__btn" onClick={clearInput}>Очистить</button>
            <button type="submit" className="btn search__btn">Найти</button>
        </form>
    )
}