import * as React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Permission, Role } from "@/types"; // Import Role
import { Checkbox } from "@/components/ui/checkbox";

interface EditProps {
    role: Role;
    permissions: Permission[];
}

function Edit({ role, permissions }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name, // Inisialisasi dengan data role yang ada
        selectedPermissions: role.permissions.map((p) => p.name), // Inisialisasi dengan permissions yang sudah dipilih
    });

    // define method handleSelectedPermissions
    const handleSelectedPermissions = (
        checked: boolean,
        permissionName: string
    ) => {
        let items = data.selectedPermissions;
        if (checked) {
            items.push(permissionName);
        } else {
            items = items.filter((item) => item !== permissionName);
        }
        setData("selectedPermissions", items);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("dashboard.roles.update", role.id)); // Gunakan put untuk update
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Role</CardTitle>
                    <CardDescription>Edit a role for user</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="manager"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    value={data.name}
                                />
                                {errors.name && (
                                    <p className="text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <div className="flex flex-row flex-wrap gap-4">
                                    {permissions.map((permission, i) => (
                                        <div
                                            className="flex items-center space-x-2"
                                            key={i}
                                        >
                                            <Checkbox
                                                value={permission.name}
                                                checked={data.selectedPermissions.includes(
                                                    permission.name
                                                )} // Check jika permission sudah dipilih
                                                onCheckedChange={(checked) =>
                                                    handleSelectedPermissions(
                                                        Boolean(checked),
                                                        permission.name
                                                    )
                                                }
                                            />
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {permission.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.selectedPermissions && (
                                    <div className="text-xs text-red-500 mt-4">
                                        <p className="text-red-500">
                                            {errors.selectedPermissions}
                                        </p>{" "}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex space-x-2">
                        <Button variant="outline" asChild disabled={processing}>
                            <Link href={route("dashboard.roles.index")}>
                                Back
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Update
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <DashboardLayout title="Edit Role" children={page} />
);

export default Edit;
