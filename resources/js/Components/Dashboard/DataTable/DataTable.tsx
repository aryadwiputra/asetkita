import * as React from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    useReactTable,
    Row,
} from "@tanstack/react-table";
import { SearchInput } from "./SearchInput";
import { PageSizeSelect } from "./PageSizeSelect";
import { PaginationButtons } from "./PaginationButtons";
import { TableContent } from "./TableContent";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterColumn: string;
    renderActions?: (row: Row<TData>) => React.ReactNode; // Tambahkan props ini
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterColumn,
    renderActions, // Terima props renderActions
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);

    // Modifikasi columns untuk menambahkan kolom actions jika renderActions diberikan
    const modifiedColumns = React.useMemo(() => {
        if (renderActions) {
            return [
                ...columns,
                {
                    id: "actions",
                    header: "Actions",
                    enableSorting: false,
                    enableHiding: false,
                    cell: ({ row }) => renderActions(row),
                },
            ];
        }
        return columns;
    }, [columns, renderActions]);

    const table = useReactTable({
        data,
        columns: modifiedColumns, // Gunakan modifiedColumns
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination: { pageSize, pageIndex },
        },
        columnResizeMode: "onChange",
        initialState: {
            pagination: {
                pageSize,
                pageIndex,
            },
        },
    });

    const handlePageSizeChange = (size: number | "all") => {
        if (size === "all") {
            setPageSize(data.length);
            setPageIndex(0);
            table.setPageSize(data.length);
            table.setPageIndex(0);
        } else {
            setPageSize(size);
            table.setPageSize(size);
        }
    };

    const handlePageChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex);
        table.setPageIndex(newPageIndex);
    };

    const totalPages = table.getPageCount();
    const currentPage = pageIndex + 1;

    return (
        <>
            <div className="flex items-center py-4 gap-2">
                <SearchInput
                    filterColumn={filterColumn}
                    onFilterChange={(value) =>
                        table.getColumn(filterColumn)?.setFilterValue(value)
                    }
                />
                <PageSizeSelect
                    pageSize={pageSize}
                    dataLength={data.length}
                    onPageSizeChange={handlePageSizeChange}
                />
            </div>
            <TableContent table={table} columns={modifiedColumns} />{" "}
            {/* Gunakan modifiedColumns */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="py-4 text-sm text-gray-600">
                    Showing {table.getRowModel().rows.length} of {data.length}
                    {" data."}
                </div>
                <PaginationButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
}
