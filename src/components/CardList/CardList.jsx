import { useContext } from "react";
import { PageContext } from "../../Context/PageContext";
import NotFound from "../../Pages/NotFound/NotFound";
import Card from "../Card/Card";
import s from "./index.module.css";

export default function CardList(){

    const {cards: goods} = useContext(PageContext);
    return( 
       
        <div className={s.cardList}>
            { !!!goods.length ? <NotFound error={`По вашему запросу ничего не найдено.`}/>
            : goods?.map((item)=><Card key={item._id} {...item}/>)
            }
        </div>

    )
}