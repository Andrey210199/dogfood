import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import cn from "classnames";

import s from "./index.module.css";

export function Paginate({ paginateHook, maxViewPage = 10, setChangePage }) {

    const [dataPage, setDataPage] = useState([]);

    const dispatch = useDispatch();

    function addPages(one, last) {
        const arr = [];
        for (let i = one; i <= last; i++) {
            arr.push(i);
        }

        return arr;
    }

    useEffect(() => {

        const arr = [];

        if (maxViewPage < paginateHook.maxPage) {
            const minPage = paginateHook.page - Math.round(maxViewPage / 2);
            const maxPage = paginateHook.page + Math.round(maxViewPage / 2);

            switch (true) {
                case minPage < 1 && maxPage <= paginateHook.maxPage:
                    arr.push(...addPages(1, maxViewPage));
                    break;

                case minPage > 1 && maxPage <= paginateHook.maxPage:
                    arr.push(...addPages(minPage + 1, maxPage));
                    break;

                case minPage === 1:
                    arr.push(...addPages(minPage + 1, maxPage))
                    break;

                default:
                    arr.push(...addPages(paginateHook.maxPage - maxViewPage + 1, paginateHook.maxPage));
                    break;

            }
        }
        else {
            arr.push(...addPages(1, paginateHook.maxPage));
        }

        setDataPage(arr);

    }, [paginateHook, maxViewPage]);

    function changePage(e) {
        setChangePage && dispatch(setChangePage(Number(e.target.value)))
        paginateHook.changePage(e.target.value);
    }

    function startPage() {
        setChangePage && dispatch(setChangePage(1));
        paginateHook.onePage();
    }

    function lastPage() {
        setChangePage && dispatch(setChangePage(paginateHook.maxPage));
        paginateHook.lastPage();
    }

    function nextPate() {
        setChangePage && dispatch(setChangePage(paginateHook.page + 1));
        paginateHook.next()
    }

    function prevPage() {
        setChangePage && dispatch(setChangePage(paginateHook.page - 1));
        paginateHook.previews()
    }

    return (
        <div className={s.paginate}>
            <button className={s.paginate__btn} onClick={startPage} >{"<<"}</button>
            <button className={s.paginate__btn} onClick={prevPage}>{"<"}</button>
            {dataPage.map(page => <button className={cn(s.paginate__btn, {[s.paginate__btn_active]: (page === paginateHook.page) })} key={page} value={page} onClick={changePage}>{page}</button>)}
            <button className={s.paginate__btn} onClick={nextPate}>{">"}</button>
            <button className={s.paginate__btn} onClick={lastPage}>{">>"}</button>

        </div>
    );
}