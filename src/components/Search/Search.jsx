import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import { ReactComponent as ClearIcon} from "./img/clear.svg";
import { ReactComponent as SearchIcon} from "./img/magnifier.svg";
import { ROUTELINKHOME } from "../../Constant/Constant.js";
import { fetchSearch, setSearchState } from "../../Storage/Slices/ProductsSlice.js";
import s from "./index.module.css";

export default function Search() {

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
        <form action="" className={s.search} onSubmit={handleSubmit}>
            <input type="text" value={inputText !== null ? inputText : ""} className={s.search__input} placeholder="Поиск" onInput={handleInput} />

            <button type="button" className={cn(s.btn,"clear__btn")} onClick={clearInput}><ClearIcon className={s.icon}/></button>
            <button type="submit" className={cn(s.btn, s.search__btn)}><SearchIcon className={s.icon}/></button>
        </form>
    )
}