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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        from: "",
        to: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("dashboard.classes.store"));
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Create new class</CardTitle>
                    <CardDescription>
                        Create a new class for user
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Kelas 1"
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
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Asset dengan nilai dari xxx sampai xxx"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    value={data.description}
                                />
                                {errors.description && (
                                    <p className="text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="from">From</Label>
                                    <Input
                                        id="from"
                                        type="number"
                                        placeholder="From"
                                        onChange={(e) =>
                                            setData("from", e.target.value)
                                        }
                                        value={data.from}
                                    />
                                    {errors.from && (
                                        <p className="text-red-500">
                                            {errors.from}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="to">To</Label>
                                    <Input
                                        id="to"
                                        type="number"
                                        placeholder="To"
                                        onChange={(e) =>
                                            setData("to", e.target.value)
                                        }
                                        value={data.to}
                                    />
                                    {errors.to && (
                                        <p className="text-red-500">
                                            {errors.to}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex space-x-2">
                        <Button variant="outline" asChild disabled={processing}>
                            <Link href={route("dashboard.classes.index")}>
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
