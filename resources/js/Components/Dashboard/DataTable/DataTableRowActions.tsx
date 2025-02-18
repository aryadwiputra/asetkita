"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { createPortal } from "react-dom"; // Import createPortal

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    handleDelete: (id: number) => void;
    editRoute: (id: number) => string;
}

export function DataTableRowActions<TData extends { id: number }>({
    row,
    handleDelete,
    editRoute,
}: DataTableRowActionsProps<TData>) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Fungsi untuk membuka dialog
    const openDeleteDialog = () => {
        setIsDialogOpen(true);
    };

    // Fungsi untuk menutup dialog
    const closeDeleteDialog = () => {
        setIsDialogOpen(false);
    };

    // Fungsi untuk menghapus data
    const confirmDelete = () => {
        handleDelete(row.original.id);
        closeDeleteDialog();
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem asChild>
                        <Link href={editRoute(row.original.id)}>
                            <PencilIcon className="mr-2 h-4 w-4" /> Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={openDeleteDialog}>
                        <Trash2Icon className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Gunakan Portal untuk merender AlertDialog di luar DropdownMenu */}
            {createPortal(
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete this item and remove it from
                                your data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDeleteDialog}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete}>
                                Confirm
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>,
                document.body // Render di root document
            )}
        </>
    );
}
