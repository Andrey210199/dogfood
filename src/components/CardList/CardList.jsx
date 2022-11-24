import { useContext } from "react"
import { CardContext } from "../../Context/CardContext"
import { UserContext } from "../../Context/UserContext"
import Card from "../Card/Card"
import s from "./index.module.css"

export default function CardList(){

    const {cards: goods} = useContext(CardContext);

    return( 
        <div className={s.cardList}>
            {goods?.map((item)=><Card key={item._id} {...item}/>)}
        </div>

    )
}