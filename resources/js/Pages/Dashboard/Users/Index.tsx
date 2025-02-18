    import DashboardLayout from "@/Layouts/DashboardLayout";
    import React from "react";
    import { DataTable } from "@/Components/Dashboard/DataTable/DataTable";
    import { ColumnDef } from "@tanstack/react-table";
    import { User } from "@/types";
    import { Button, buttonVariants } from "@/components/ui/button";
    import { Link, router } from "@inertiajs/react";
    import { ArrowUpDown, UsersIcon } from "lucide-react";
    import { DataTableRowActions } from "@/Components/Dashboard/DataTable/DataTableRowActions";

    function Index({ users }: { users: User[] }) {
        // Fungsi untuk menghapus data
        const handleDelete = (id: number) => {
            router.delete(route("dashboard.users.destroy", id));
        };

        // Fungsi untuk membuat route edit
        const editRoute = (id: number) => {
            return route("dashboard.users.edit", id);
        };

        const columns: ColumnDef<User>[] = [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "email",
                header: ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting(column.getIsSorted() === "asc")
                            }
                        >
                            Email
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
                                    <UsersIcon />{" "}
                                    <h1 className="text-2xl font-bold">Users</h1>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Show all users data{" "}
                                </p>{" "}
                            </div>
                        </div>
                    </div>
                    <Link
                        href={route("dashboard.users.create")}
                        className={buttonVariants({ variant: "default" })}
                    >
                        Create new user
                    </Link>
                </div>
                <div>
                    <DataTable<User, ColumnDef<User>>
                        columns={columns}
                        data={users}
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
