import { useEffect, useState } from "react";

export default function usePaginate(cnt, data) {

    const [page, setPage] = useState(1);
    const maxPage = Math.ceil(data.length / cnt);

    useEffect(() => {
        setPage(1);
    }, [data])

    function next() {
        const newPage = Math.min(page + 1, maxPage);
        setPage(newPage);
    }

    function previews() {
        const newPage = Math.max(1, page - 1);
        setPage(newPage);
    }

    function changePage(page) {
        setPage(Number(page));
    }

    function onePage() {
        setPage(1);
    }

    function lastPage() {
        setPage(maxPage);
    }

    function dataPage() {
        const start = (page - 1) * cnt;
        const end = start + cnt;
        return data.slice(start, end);
    }

    return { dataPage, page, maxPage, next, previews, onePage, lastPage, changePage };
}