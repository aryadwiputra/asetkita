import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { DataTable } from "@/Components/Dashboard/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import {
    ArrowUpDown,
    BoxesIcon,
    RulerIcon,
    ShapesIcon,
    TreesIcon,
    UsersIcon,
} from "lucide-react";
import { DataTableRowActions } from "@/Components/Dashboard/DataTable/DataTableRowActions";
import { UnitOfMeasurement } from "@/types/unit_of_measurement";

function Index({
    unit_of_measurements,
}: {
    unit_of_measurements: UnitOfMeasurement[];
}) {
    // Fungsi untuk menghapus data
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.unit_of_measurements.destroy", id));
    };

    // Fungsi untuk membuat route edit
    const editRoute = (id: number) => {
        return route("dashboard.unit_of_measurements.edit", id);
    };

    const columns: ColumnDef<UnitOfMeasurement>[] = [
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
    ];

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {/* Menambahkan ikon */}
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                                <RulerIcon />{" "}
                                <h1 className="text-2xl font-bold">
                                    Unit of Measurements
                                </h1>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Show all unit of measurement data{" "}
                            </p>{" "}
                        </div>
                    </div>
                </div>

                <Link
                    href={route("dashboard.unit_of_measurements.create")}
                    className={buttonVariants({ variant: "default" })}
                >
                    Create new unit of measurement
                </Link>
            </div>
            <div>
                <DataTable<UnitOfMeasurement, ColumnDef<UnitOfMeasurement>>
                    columns={columns}
                    data={unit_of_measurements}
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
    <DashboardLayout title="Unit of Measurements" children={page} />
);

export default Index;
