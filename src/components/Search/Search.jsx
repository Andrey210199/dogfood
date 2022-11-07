import s from "./index.module.css"

export function Search(){
    return( 
        <form action="" className="search">
            <input type="text" className="search__input" placeholder="Поиск"/>
            <button type="submit" className="btn search__btn">Найти</button>
        </form>
    )
}