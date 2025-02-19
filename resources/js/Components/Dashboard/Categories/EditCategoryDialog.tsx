// components/Categories/Edit.tsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface EditCategoryDialogProps {
    open: boolean;
    onClose: () => void;
    initialData: { id: number; name: string } | null;
    onSave: (id: number, data: { name: string }) => void;
}

export function EditCategoryDialog({ open, onClose, initialData, onSave }: EditCategoryDialogProps) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        } else {
            setName(""); // Reset name jika initialData null
        }
    }, [initialData]);

    const handleSave = () => {
        if (initialData) {
            onSave(initialData.id, { name });
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}