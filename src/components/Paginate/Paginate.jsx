import { useEffect, useState } from "react";

import s from "./index.module.css";

export function Paginate({ paginateHook, maxViewPage = 10 }) {

    const [dataPage, setDataPage] = useState([]);

    function addPages(one, last) {
        const arr = [];
        for (let i = one; i <= last; i++) {
            arr.push(i);
        }

        return arr;
    }

    useEffect(() => {

        const arr = [];
        const minPage = paginateHook.page - Math.round(maxViewPage / 2);
        const maxPage = paginateHook.page + Math.round(maxViewPage / 2);

        switch (true) {
            case maxViewPage > paginateHook.maxPage:
                arr.push(...addPages(1, paginateHook.maxPage));
                break;

            case minPage < 1 && maxPage <= paginateHook.maxPage:
                arr.push(...addPages(1, maxPage));
                break;

            case minPage > 1 && maxPage <= paginateHook.maxPage:
                arr.push(...addPages(minPage + 1, maxPage));
                break;

            case minPage === 1:
                arr.push(...addPages(minPage + 1, maxPage))
                break;

            default:
                arr.push(...addPages(minPage, paginateHook.maxPage));
                break;

        }



        setDataPage(arr);

    }, [paginateHook, maxViewPage])

    return (
        <div className={s.paginate}>

            {dataPage.map(page => <button className={s.paginate__btn} key={page} value={page} onClick={(e) => paginateHook.changePage(e.target.value)}>{page}</button>)}

        </div>
    );
}