import { useSelector } from "react-redux";
import AllPrice from "../../components/AllPrice/AllPrice";
import Cart from "../../components/Cart/Cart";
import ContentHeader from "../../components/ContentHeader/ContentHeader";

export default function CartPage() {

    const products = useSelector(state => state.cart.data);
    return (
        <>
            <ContentHeader title="Корзина" />
            {Object.values(products)?.map(product => <Cart key={product._id} {...product} />)}
            <AllPrice {...products} />
        </>
    )
}