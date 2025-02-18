import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { DataTable } from "@/Components/Dashboard/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Permission } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { ArrowUpDown, ShieldIcon, UsersIcon } from "lucide-react";
import { DataTableRowActions } from "@/Components/Dashboard/DataTable/DataTableRowActions";

function Index({ permissions }: { permissions: Permission[] }) {
    // Fungsi untuk menghapus data
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.permissions.destroy", id));
    };

    // Fungsi untuk membuat route edit
    const editRoute = (id: number) => {
        return route("dashboard.permissions.edit", id);
    };

    const columns: ColumnDef<Permission>[] = [
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
                        {/* Menambahkan ikon user */}
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                                <ShieldIcon />{" "}
                                <h1 className="text-2xl font-bold">
                                    Permissions
                                </h1>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Show all permissions data{" "}
                            </p>{" "}
                        </div>
                    </div>
                </div>
                <Link
                    href={route("dashboard.permissions.create")}
                    className={buttonVariants({ variant: "default" })}
                >
                    Create new permission
                </Link>
            </div>
            <div>
                <DataTable<Permission, ColumnDef<Permission>>
                    columns={columns}
                    data={permissions}
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
    <DashboardLayout title="Roles" children={page} />
);

export default Index;
