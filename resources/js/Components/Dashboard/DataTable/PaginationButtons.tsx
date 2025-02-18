import * as React from "react";
import { Button } from "@/components/ui/button";

interface PaginationButtonsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPageIndex: number) => void;
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const pageNumbers = () => {
        const pages = [];
        const range = 1;
        let start = Math.max(0, currentPage - range);
        let end = Math.min(totalPages - 1, currentPage - 1 + range);

        if (start > 0) {
            pages.push(1);
            if (start > 1) pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i + 1);
        }

        if (end < totalPages - 1) {
            if (end < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(0)}
                disabled={currentPage === 1}
            >
                First
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 2)} // Perbaikan disini
                disabled={currentPage === 1}
            >
                Previous
            </Button>
            {pageNumbers().map((page, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        typeof page === "number" &&
                        page !== currentPage &&
                        onPageChange(page - 1)
                    }
                    disabled={page === currentPage}
                >
                    {page}
                </Button>
            ))}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 0)}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(totalPages - 1)}
                disabled={currentPage === totalPages}
            >
                Last
            </Button>
        </div>
    );
};
