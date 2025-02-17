import ApplicationLogo from "@/Components/ApplicationLogo/Index";
import InputError from "@/Components/InputError";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import UnauthenticatedLayout from "@/Layouts/UnauthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const onHandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            <div className="flex flex-col px-6 py-4">
                <ApplicationLogo size="size-12" />
                <div className="flex flex-col items-center justify-center py-12 lg:py-20">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        <div className="grid gap-2 text-center">
                            {status && (
                                <Alert variant="success">
                                    <AlertDescription>
                                        {status}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <h1 className="text-3xl font-bold">Masuk</h1>
                            <p className="text-balance text-muted-foreground">
                                Masukkan email anda dibawah ini untuk masuk ke
                                akun anda
                            </p>
                        </div>
                        <form onSubmit={onHandleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="email"
                                        placeholder="zoro@cendekia.com"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    {errors.email && (
                                        <InputError message={errors.email} />
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route("password.request")}
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Lupa Password
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        placeholder="********"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <InputError message={errors.password} />
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <div className="items-top flex space-x-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            checked={data.remember}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label htmlFor="remember">
                                                Ingat Saya
                                            </Label>
                                        </div>
                                    </div>
                                    {errors.remember && (
                                        <InputError message={errors.remember} />
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    size="xl"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Masuk
                                </Button>
                            </div>
                        </form>
                        <div className="mt-1 text-center text-sm">
                            Belum punya akun?{" "}
                            <Link
                                href={route("register")}
                                className="underline"
                            >
                                Daftar
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
    );
}

Login.layout = (page: React.ReactNode) => (
    <UnauthenticatedLayout children={page} title="Login" />
);
