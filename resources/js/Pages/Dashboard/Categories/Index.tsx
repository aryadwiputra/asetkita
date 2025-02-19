import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { DataTable } from "@/Components/Dashboard/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { ArrowUpDown, BoxesIcon, TreesIcon, UsersIcon } from "lucide-react";
import { DataTableRowActions } from "@/Components/Dashboard/DataTable/DataTableRowActions";
import { CreateCategory } from "@/Components/Dashboard/Categories/CreateCategory";

function Index({ categories }: { categories: Category[] }) {
    // Fungsi untuk menghapus data
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.categories.destroy", id));
    };

    // Fungsi untuk membuat route edit
    const editRoute = (id: number) => {
        return route("dashboard.categories.edit", id);
    };

    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {/* Menambahkan ikon */}
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                                <BoxesIcon />{" "}
                                <h1 className="text-2xl font-bold">Categories</h1>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Show all categories data{" "}
                            </p>{" "}
                        </div>
                    </div>
                </div>
                <CreateCategory/>   
            </div>
            <div>
                <DataTable<Category, ColumnDef<Category>>
                    columns={columns}
                    data={categories}
                    filterColumn="name"
                    renderActions={(row) => (
                        <DataTableRowActions
                            row={row}
                            handleDelete={handleDelete}
                            editRoute={editRoute}
                        />
                    )}
                />
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => (
    <DashboardLayout title="Users" children={page} />
);

export default Index;
