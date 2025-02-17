import { Head } from "@inertiajs/react";

export default function UnauthenticatedLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <>
            <Head title={title} />
            {children}
        </>
    );
}
