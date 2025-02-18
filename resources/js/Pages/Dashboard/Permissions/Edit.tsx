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

function Edit({ permission }: { permission: { id: number; name: string; email: string } }) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("dashboard.permissions.update", permission.id));
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Permission</CardTitle>
                    <CardDescription>
                        Edit the permission details
                    </CardDescription>
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
                        </div>
                    </CardContent>
                    <CardFooter className="flex space-x-2">
                        <Button variant="outline" asChild disabled={processing}>
                            <Link href={route("dashboard.permissions.index")}>
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

Edit.layout = (page: React.ReactNode) => (
    <DashboardLayout title="Edit User" children={page} />
);

export default Edit;
