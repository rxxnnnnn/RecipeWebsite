import React from 'react';

const PaginationComponent = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxPageNumbersToShow = 5; // Adjust as needed
    currentPage = Number(currentPage) || 1;
    const getPageNumbers = () => {
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(start + maxPageNumbersToShow - 1, totalPages);

        if (totalPages - start < maxPageNumbersToShow) {
            start = Math.max(1, totalPages - maxPageNumbersToShow + 1);
        }

        const pageNumbers = [];
        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    const handlePageClick = (pageNumber) => {
        onPageChange(Number(pageNumber));
    };

    return (
        <div>
            <button
                onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {totalPages > 0 && currentPage > 3 && (
                <button onClick={() => handlePageClick(1)}>1</button>
            )}

            {totalPages > maxPageNumbersToShow && currentPage > 4 && <span>...</span>}

            {getPageNumbers().map(pageNumber => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    disabled={currentPage === pageNumber}
                >
                    {pageNumber}
                </button>
            ))}

            {totalPages > maxPageNumbersToShow && currentPage < totalPages - 3 && <span>...</span>}

            {totalPages > maxPageNumbersToShow && currentPage < totalPages - 2 && (
                <button onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
            )}

            <button
                onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationComponent;
