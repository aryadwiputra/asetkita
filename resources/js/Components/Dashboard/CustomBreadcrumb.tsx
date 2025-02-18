import React, { useMemo } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, usePage } from "@inertiajs/react";

function CustomBreadcrumb() {
    const { url } = usePage(); // Mendapatkan URL saat ini dari Inertia

    // Fungsi untuk mengonversi URL menjadi breadcrumb
    const breadcrumbs = useMemo(() => {
        const paths = url.split("/").filter((path) => path); // Menghapus bagian kosong
        const breadcrumbPaths = paths.map((path, index) => ({
            name: path.charAt(0).toUpperCase() + path.slice(1), // Capitalize first letter
            href: `/${paths.slice(0, index + 1).join("/")}`, // Membuat URL untuk setiap breadcrumb
        }));

        // Jika URL-nya tidak hanya '/dashboard', kita tambahkan breadcrumb "Dashboard"
        if (paths[0] !== "dashboard") {
            breadcrumbPaths.unshift({
                name: "Dashboard",
                href: "/dashboard",
            });
        }

        return breadcrumbPaths;
    }, [url]);

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.map((breadcrumb, index) => (
                        <BreadcrumbItem key={breadcrumb.href}>
                            {index === breadcrumbs.length - 1 ? (
                                <BreadcrumbPage>
                                    {breadcrumb.name}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={breadcrumb.href}>
                                        {breadcrumb.name}
                                    </Link>
                                </BreadcrumbLink>
                            )}
                            {index < breadcrumbs.length - 1 && (
                                <BreadcrumbSeparator />
                            )}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </>
    );
}

export default CustomBreadcrumb;
