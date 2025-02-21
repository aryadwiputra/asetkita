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
import { Textarea } from "@/components/ui/textarea";

type UnitOfMeasurementData = {
    id: number;
    name: string;
    description: string;
};

function Edit({ unitData }: { unitData: UnitOfMeasurementData }) {
    const { data, setData, put, processing, errors } = useForm({
        name: unitData.name,
        description: unitData.description,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("dashboard.unit_of_measurements.update", unitData.id));
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Edit unit of measurement</CardTitle>
                    <CardDescription>
                        Edit the details of the unit of measurement
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Kg"
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
                                    placeholder="Satuan aset berdasarkan berat"
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
                        </div>
                    </CardContent>
                    <CardFooter className="flex space-x-2">
                        <Button variant="outline" asChild disabled={processing}>
                            <Link
                                href={route(
                                    "dashboard.unit_of_measurements.index"
                                )}
                            >
                                Back
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Save Changes
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => (
    <DashboardLayout title="Edit unit of measurement" children={page} />
);

export default Edit;
