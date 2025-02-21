import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { DataTable } from "@/Components/Dashboard/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { ArrowUpDown, BoxesIcon, ShapesIcon, TreesIcon, UsersIcon } from "lucide-react";
import { DataTableRowActions } from "@/Components/Dashboard/DataTable/DataTableRowActions";
import { Class } from "@/types/class";

function Index({ classes }: { classes: Class[] }) {
    // Fungsi untuk menghapus data
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.classes.destroy", id));
    };

    // Fungsi untuk membuat route edit
    const editRoute = (id: number) => {
        return route("dashboard.classes.edit", id);
    };

    const columns: ColumnDef<Class>[] = [
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
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "from",
            header: "From",
        },
        {
            accessorKey: "to",
            header: "To",
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
                                <ShapesIcon />{" "}
                                <h1 className="text-2xl font-bold">Class</h1>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Show all asset class data{" "}
                            </p>{" "}
                        </div>
                    </div>
                </div>

                <Link
                    href={route("dashboard.classes.create")}
                    className={buttonVariants({ variant: "default" })}
                >
                    Create new class
                </Link>
            </div>
            <div>
                <DataTable<Class, ColumnDef<Class>>
                    columns={columns}
                    data={classes}
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
    <DashboardLayout title="Class" children={page} />
);

export default Index;
