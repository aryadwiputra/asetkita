import ApplicationLogo from "@/Components/ApplicationLogo/Index";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import UnauthenticatedLayout from "@/Layouts/UnauthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const onHandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <>
            <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
                <div className="flex flex-col px-6 py-4">
                    <ApplicationLogo size="size-12" />
                    <div className="flex flex-col items-center justify-center py-12 lg:py-40">
                        <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                            <div className="grid gap-2 text-center">
                                {status === "verification-link-sent" && (
                                    <Alert variant="success">
                                        <AlertDescription>
                                            Link verifikasi telah dikirim ke
                                            email anda
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <h1 className="text-3xl font-bold">
                                    Verifikasi Email
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    Sebelum melanjutkan, pastikan email anda
                                    terverifikasi
                                </p>
                            </div>
                            {/* Form */}
                            <form onSubmit={onHandleSubmit}>
                                <div className="grid gap-4">
                                    <Button
                                        size="xl"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        Kirim Ulang Link Verifikasi
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="underline"
                                >
                                    Logout
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

VerifyEmail.layout = (page: React.ReactNode) => (
    <UnauthenticatedLayout children={page} title="Verifikasi Email" />
);
