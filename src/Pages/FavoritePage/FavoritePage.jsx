import { useSelector } from "react-redux";
import CardList from "../../components/CardList/CardList";
import ContentHeader from "../../components/ContentHeader/ContentHeader";


export default function FavoritePage(){
    const favorites = useSelector(state => state.products.favorites);
    
    return(
        <>
         <ContentHeader title="Избранное"/>
         <CardList goods={favorites}/>
        </>
    )
}