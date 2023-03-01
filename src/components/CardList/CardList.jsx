import usePaginate from "../../Hooks/UsePaginate";
import NotFound from "../../Pages/NotFound/NotFound";
import Card from "../Card/Card";
import { Paginate } from "../Paginate/Paginate";
import s from "./index.module.css";

export default function CardList({ goods }) {

    const paginate = usePaginate(12, goods);

    return (
        <>
            <div className={s.cardList}>
                {!!!goods?.length ? <NotFound error={`По вашему запросу ничего не найдено.`} />
                    : paginate?.dataPage().map(item => <Card key={item._id} {...item} />)
                }
            </div>

            {paginate.maxPage > 1 && <Paginate paginateHook={paginate} />}
        </>



    )
}