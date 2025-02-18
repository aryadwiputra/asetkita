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
import { Permission } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

function Create({ permissions }: { permissions: Permission[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        selectedPermissions: [] as string[], // Add type annotation here
    });

    console.log(permissions);

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
        post(route("dashboard.roles.store"));
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Create new role</CardTitle>
                    <CardDescription>
                        Create a new role for user
                    </CardDescription>
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
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="roles">Roles</Label>
                                <div className="flex flex-row flex-wrap gap-4">
                                    {permissions.map((permission, i) => (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                value={permission.name}
                                                onCheckedChange={(checked) =>
                                                    handleSelectedPermissions(
                                                        Boolean(checked),
                                                        permission.name
                                                    )
                                                }
                                                key={i}
                                            />
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {permission.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.selectedPermissions && (
                                    <p className="text-red-500">
                                        {errors.selectedPermissions}
                                    </p>
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
                            Save
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}

Create.layout = (page: React.ReactNode) => (
    <DashboardLayout title="Create new permission" children={page} />
);

export default Create;
