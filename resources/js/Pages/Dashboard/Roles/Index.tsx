import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { DataTable } from "@/Components/Dashboard/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { ArrowUpDown, ShieldIcon, UsersIcon } from "lucide-react";
import { DataTableRowActions } from "@/Components/Dashboard/DataTable/DataTableRowActions";

function Index({ roles }: { roles: Role[] }) {
    // Fungsi untuk menghapus data
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.roles.destroy", id));
    };

    // Fungsi untuk membuat route edit
    const editRoute = (id: number) => {
        return route("dashboard.roles.edit", id);
    };

    const columns: ColumnDef<Role>[] = [
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
            accessorKey: "guard_name",
            header: "Guard Name",
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
                                <h1 className="text-2xl font-bold">Roles</h1>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Show all roles data{" "}
                            </p>{" "}
                        </div>
                    </div>
                </div>
                <Link
                    href={route("dashboard.roles.create")}
                    className={buttonVariants({ variant: "default" })}
                >
                    Create new role
                </Link>
            </div>
            <div>
                <DataTable<Role, ColumnDef<Role>>
                    columns={columns}
                    data={roles}
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
