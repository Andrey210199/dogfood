import CardList from "../../components/CardList/CardList";
import ContentHeader from "../../components/ContentHeader/ContentHeader";


export default function FavoritePage({favorites}){
    return(
        <>
         <ContentHeader title="Избранное"/>
         <CardList goods={favorites}/>
        </>
    )
}