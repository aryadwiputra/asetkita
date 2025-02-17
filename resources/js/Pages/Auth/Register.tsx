import ApplicationLogo from "@/Components/ApplicationLogo/Index";
import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UnauthenticatedLayout from "@/Layouts/UnauthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
                <div className="flex flex-col px-6 py-4">
                    <ApplicationLogo size="size-12" />
                    <div className="flex flex-col items-center justify-center py-12 lg:py-20">
                        <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                            <div className="grid gap-2 text-center">
                                <h1 className="text-3xl font-bold">Daftar</h1>
                                <p className="text-balance text-muted-foreground">
                                    Masukkan data diri anda dibawah ini, untuk
                                    membuat akun anda
                                </p>
                            </div>
                            <form onSubmit={submit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>

                                        <Input
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            placeholder="Roronoa Zoro"
                                            autoComplete="name"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />

                                        {errors.name && (
                                            <InputError message={errors.name} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            placeholder="zoro@cendekia.com"
                                            type="email"
                                            autoComplete="email"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />

                                        {errors.email && (
                                            <InputError
                                                message={errors.email}
                                            />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>

                                        <Input
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            placeholder="********"
                                            type="password"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {errors.password && (
                                            <InputError
                                                message={errors.password}
                                            />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Konfirmasi Password
                                        </Label>

                                        <Input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            placeholder="********"
                                            type="password"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {errors.password_confirmation && (
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        size="xl"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        Daftar
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-1 text-center text-sm">
                                Sudah punya akun?{" "}
                                <Link
                                    href={route("login")}
                                    className="underline"
                                >
                                    Masuk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-mued hidden lg:block">
                    <img
                        src="/images/login.jpg"
                        alt="login"
                        className="h-full w-full object-cover dark:brightness-[0.4] dark:grayscale-0"
                    />
                </div>
            </div>
        </>
    );
}

Register.layout = (page : React.ReactNode) => (
    <UnauthenticatedLayout children={page} title="Daftar" />
);
