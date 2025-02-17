import ApplicationLogo from "@/Components/ApplicationLogo/Index";
import InputError from "@/Components/InputError";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UnauthenticatedLayout from "@/Layouts/UnauthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandlesubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <>
            <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
                <div className="flex flex-col px-6 py-4">
                    <ApplicationLogo size="size-12" />
                    <div className="flex flex-col items-center justify-center py-12 lg:py-40">
                        <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                            <div className="grid gap-2 text-center">
                                {status && (
                                    <Alert variant="success">
                                        <AlertDescription>
                                            {status}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <h1 className="text-3xl font-bold">
                                    Lupa Password
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    Silahkan masukkan email anda dibawah ini
                                </p>
                            </div>

                            <form onSubmit={onHandlesubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            placeholder="zoro@cendekia.com"
                                            autoComplete="username"
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
                                    <Button
                                        type="submit"
                                        size="xl"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        Kirim Email Reset Password
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-1 text-center text-sm">
                                 Ingat password?{" "}
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

ForgotPassword.layout = (page: React.ReactNode) => (
    <UnauthenticatedLayout children={page} title="Lupa Password" />
);
