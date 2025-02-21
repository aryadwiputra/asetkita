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
import { Role } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

function Create({ roles }: { roles: Role[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        selectedRoles: [] as string[], // Add type annotation here,
    });

    // define method handleSelectedPermissions
    const handleSelectedRoles = (checked: boolean, roleName: string) => {
        let items = data.selectedRoles;

        if (checked) {
            items.push(roleName);
        } else {
            items = items.filter((item) => item !== roleName);
        }

        setData("selectedRoles", items);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("dashboard.users.store"));
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Create new user</CardTitle>
                    <CardDescription>Create a new user account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
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
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="example@me.com"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    value={data.email}
                                />
                                {errors.email && (
                                    <p className="text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="roles">Roles</Label>
                                <div className="flex flex-row flex-wrap gap-4">
                                    {roles.map((role, i) => (
                                        <div
                                            className="flex items-center space-x-2"
                                            key={i}
                                        >
                                            <Checkbox
                                                value={role.name}
                                                checked={data.selectedRoles.includes(
                                                    role.name
                                                )} // Check jika role sudah dipilih
                                                onCheckedChange={(checked) =>
                                                    handleSelectedRoles(
                                                        Boolean(checked),
                                                        role.name
                                                    )
                                                }
                                            />
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {role.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.selectedRoles && (
                                    <p className="text-red-500">
                                        {errors.selectedRoles}
                                    </p>
                                )}
                            </div>

                            {/* Grid Col for password and password confirmation */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        value={data.password}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password_confirmation">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        value={data.password_confirmation}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-red-500">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex space-x-2">
                        <Button variant="outline" asChild disabled={processing}>
                            <Link href={route("dashboard.users.index")}>
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
    <DashboardLayout title="Create new user" children={page} />
);

export default Create;
