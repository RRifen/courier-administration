import Pagination from 'react-bootstrap/Pagination';
import React from "react";
import "../../css/CustomStyles.css"

interface PaginationProps {
    count: number,
    perPage: number,
    page: number,
    setPage:  any
}

function getPagesCount(count: number, perPageCount: number): number {
    if (count === 0) {
        return 1;
    }
    return Math.floor((count - 1) / perPageCount) + 1;
}

function createPaginationItems(pagesCount: number, page: number, setPage: any): React.ReactElement[] {
    let paginationItems: React.ReactElement[] = []
    let active: boolean;
    for(let i = 0; i < pagesCount; i++) {
        active = (i + 1) === page;
        paginationItems.push(<Pagination.Item key={i} active={active} onClick={() =>
            setPage(i + 1)
        }>{i+1}</Pagination.Item>)
    }
    return paginationItems;
}

export function PaginationUnderTable({ count, perPage, page, setPage } : PaginationProps) {

    let pagesCount: number = getPagesCount(count, perPage);
    let paginationItems: React.ReactElement[] = createPaginationItems(pagesCount, page, setPage);

    return (
        <Pagination className="text">
            <Pagination.Prev onClick={() => {
                if (page > 1) setPage(page - 1)
            }}/>
            {paginationItems}
            <Pagination.Next onClick={() => {
                if (page < pagesCount) setPage(page + 1);
            }}/>
        </Pagination>
    );
}