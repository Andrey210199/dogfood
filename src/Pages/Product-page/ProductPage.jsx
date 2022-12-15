import Product from "../../components/Product/Product";
import Spiner from "../../components/Spiner/Spiner";

import api from "../../Utilites/Api";
import isLike from "../../Utilites/IsLike.js";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { PageContext } from "../../Context/PageContext";
import { productLike } from "../../Utilites/Product.js";
import NotFound from "../NotFound/NotFound";


export default function ProductPage() {
    const { isLoading, setIsLoading, errorState, setErrorState, setCards, cards } = useContext(PageContext);
    const {user} = useContext(GlobalContext);

    const { productId } = useParams();
    const [product, setProduct] = useState();


    function handleLike(likes) {
        
        let like = isLike(likes, user?._id);
        api.checkLike(productId, like)
            .then((updateProduct) => {
                setProduct(updateProduct);
                productLike(cards, updateProduct, setCards);
            })
    }

    useEffect(() => {

        setIsLoading(true);

        api.getProducts(productId)
            .then(product => {
                setProduct(product);
            })
           .catch(err =>{
                setErrorState(err);
            })
            .finally(()=> setIsLoading(false));

    }, []);

    return (
        <>
            {isLoading ? <Spiner /> :
               !errorState && <Product {...product} handleLike ={handleLike} setProduct={setProduct}/>
            }
            {errorState && <NotFound error = {errorState}/>}
        </>
    )
}