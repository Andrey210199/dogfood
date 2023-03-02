import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../Hooks/UseDebounce";
import usePaginate from "../../Hooks/UsePaginate";
import NotFound from "../../Pages/NotFound/NotFound";
import { fetchSearch, setChangePage } from "../../Storage/Slices/ProductsSlice";
import Card from "../Card/Card";
import { Paginate } from "../Paginate/Paginate";
import s from "./index.module.css";

export default function CardList({ goods, pages }) {
    const { search, page } = useSelector(state => state.products);
    const dispatch = useDispatch();
    const searchDebounce = useDebounce(search, 500);
    const paginate = usePaginate(12, goods, pages ? pages: page);

    const onRequest = useCallback((searchDebounce) => {
        return dispatch(fetchSearch(searchDebounce))
        .then(()=> dispatch(setChangePage(1)));

    }, [dispatch]);

    //Поиск ввод
    useEffect(() => {
        if (searchDebounce !== null)
            onRequest(searchDebounce);

    }, [searchDebounce, onRequest]);



    return (
        <>
            <div className={s.cardList}>
                {!!!goods?.length ? <NotFound error={`По вашему запросу ничего не найдено.`} />
                    : paginate?.dataPage().map(item => <Card key={item._id} {...item} />)
                }
            </div>

            {paginate.maxPage > 1 && <Paginate paginateHook={paginate} setChangePage={setChangePage} />}
        </>



    )
}