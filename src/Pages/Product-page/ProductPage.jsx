import Product from "../../components/Product/Product";
import Spiner from "../../components/Spiner/Spiner";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetComments, fetchSingleProduct } from "../../Storage/Slices/SingleProductSlice";


export default function ProductPage() {
    const { loading: isLoading, error: errorState } = useSelector(state => state.singleProduct);
    const { productId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
        dispatch(fetchGetComments(productId));
    }, [dispatch, productId]);

    return (
        <>
            {isLoading ? <Spiner /> :
                !errorState && <Product />
            }
            {errorState && <NotFound error={errorState} />}
        </>
    )
}