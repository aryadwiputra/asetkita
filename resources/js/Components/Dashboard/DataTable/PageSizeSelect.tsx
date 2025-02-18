import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PageSizeSelectProps {
    pageSize: number;
    dataLength: number;
    onPageSizeChange: (size: number | "all") => void;
}

export const PageSizeSelect: React.FC<PageSizeSelectProps> = ({
    pageSize,
    dataLength,
    onPageSizeChange,
}) => {
    return (
        <Select
            value={pageSize === dataLength ? "all" : String(pageSize)}
            onValueChange={(value) =>
                onPageSizeChange(value === "all" ? "all" : Number(value))
            }
        >
            <SelectTrigger className="w-[140px]">
                <SelectValue>
                    {pageSize === dataLength ? "Show All" : `${pageSize}`}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="all">Show All</SelectItem>
            </SelectContent>
        </Select>
    );
};
