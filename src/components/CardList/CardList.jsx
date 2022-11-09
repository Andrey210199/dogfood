import { Card } from "../Card/Card"
import s from "./index.module.css"

export function CardList({goods}){
    return( 
        <div className={s.cardList}>
            {goods.map((item)=><Card key={`${item.price}_${item.name.slice(0,2)}`} {...item}/>)}
        </div>

    )
}