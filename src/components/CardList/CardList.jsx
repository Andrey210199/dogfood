import { Card } from "../Card/Card"
import s from "./index.module.css"

export function CardList({goods, ...props}){
    return( 
        <div className={s.cardList}>
            {goods?.map((item)=><Card key={item._id} {...props} {...item}/>)}
        </div>

    )
}