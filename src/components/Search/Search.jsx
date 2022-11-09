import s from "./index.module.css"

export function Search({onInput, onSubmit}){
    function handleSubmit(evt){
        onInput(evt.target.value);
    }
    return( 
        <form action="" className="search" onSubmit={onSubmit}>
            <input type="text" className={s.search__input} placeholder="Поиск" onInput={handleSubmit}/>
            <button type="submit" className="btn search__btn">Найти</button>
        </form>
    )
}