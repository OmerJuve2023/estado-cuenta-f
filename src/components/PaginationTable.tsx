import React, {useState} from "react";
import "../CSS/PaginationStyle.css";

interface PaginationProps<T> {
    items: T[];
    itemsPerPage: number;
    children: (items: T[]) => React.ReactNode;
}

export default function Pagination<T>({items, itemsPerPage, children}: PaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            {children(currentItems)}
            <nav aria-label="Pagination" className={"mt-3"}>
                <ul className="pagination justify-content-center">
                    {Array(Math.ceil(items.length / itemsPerPage))
                        .fill(0)
                        .map((_, i) => (
                            <li
                                key={i}
                                className={`page-item ${
                                    currentPage === i + 1 ? "active" : ""
                                }`}
                            >
                                <button
                                    onClick={() => paginate(i + 1)}
                                    className="page-link custom-page-link"
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                </ul>
            </nav>

        </div>
    );
}