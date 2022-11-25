import Product from "../../components/Product/Product";
import Spiner from "../../components/Spiner/Spiner";

import api from "../../Utilites/Api";
import isLike from "../../Utilites/IsLike.js";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CardContext } from "../../Context/CardContext";
import { productLike } from "../../Utilites/Product.js";
import NotFound from "../NotFound/NotFound";


export default function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useContext(UserContext);
    const {setCards, cards} = useContext(CardContext);
    const [errorState, setErrorState] = useState(null);

    function handleLike(likes) {
        
        let like = isLike(likes, user?._id);
        api.checkLike(productId, like)
            .then((updateProduct) => {
                setProduct(updateProduct);
                productLike(cards, updateProduct, setCards);
            })
    }

    useEffect(() => {
        api.getProducts(productId)
            .then(product => {
                setProduct(product);
                setIsLoading(false);
            })
           .catch(err =>{
                setErrorState(err);
                setIsLoading(false);
            });

    }, []);

    return (
        <>
            {isLoading ? <Spiner /> :
               !errorState && <Product {...product} handleLike ={handleLike}/>
            }
            {errorState && <NotFound error = {errorState}/>}
        </>
    )
}