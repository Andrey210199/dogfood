import Product from "../../components/Product/Product";
import Spiner from "../../components/Spiner/Spiner";

import api from "../../Utilites/Api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function ProductPage(){
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);

   useEffect( ()=>{
    api.getProducts(productId)
    .then((product,)=>{
        setProduct(product);
        setIsLoading(false);
    });

   },[]);

    return(
        <>
                {isLoading ? <Spiner/>:
                <Product {...product}/>
                }
        </>
    )
}