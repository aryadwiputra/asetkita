import * as React from "react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
    filterColumn: string;
    onFilterChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    filterColumn,
    onFilterChange,
}) => {
    return (
        <Input
            placeholder={`Search by ${filterColumn}...`}
            onChange={(event) => onFilterChange(event.target.value)}
            className="max-w-sm"
        />
    );
};
