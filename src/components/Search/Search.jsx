import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTELINKHOME } from "../../Constant/Constant.js";
import { fetchSearch, setSearchState } from "../../Storage/Slices/ProductsSlice.js";
import s from "./index.module.css";

export default function Search({ onInput }) {

    const inputText = useSelector(state => state.products.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleInput(evt) {
        dispatch(setSearchState(evt.target.value));
    }

    function clearInput() {
        dispatch(setSearchState(""));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        navigate(ROUTELINKHOME);
        dispatch(fetchSearch(inputText));
    }



    return (
        <form action="" className="search" onSubmit={handleSubmit}>
            <input type="text" value={inputText !== null ? inputText : ""} className={s.search__input} placeholder="Поиск" onInput={handleInput} />

            <button type="button" className="btn clear__btn" onClick={clearInput}>Очистить</button>
            <button type="submit" className="btn search__btn">Найти</button>
        </form>
    )
}