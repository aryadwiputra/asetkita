import { AppSidebar } from "@/Components/Dashboard/AppSidebar/Index";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Head, usePage } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { User } from "@/types"; // Import type User
import * as React from "react";
import CustomBreadcrumb from "@/Components/Dashboard/CustomBreadcrumb";

interface DashboardLayoutProps {
    title?: string;
    children: React.ReactNode;
}

interface FlashProps {
    success?: string;
    error?: string;
}

interface PageProps {
    auth: {
        user: User;
    };
    flash: FlashProps;
}

export default function Page({ children, title }: DashboardLayoutProps) {
    const { auth, flash } = usePage().props as unknown as PageProps; // Ambil data user dari props Inertia

    React.useEffect(() => {
        if (flash.success) {
            toast.success("Success", {
                description: flash.success,
            });
        }
        if (flash.error) {
            toast.error("Error", {
                description: flash.error,
            });
        }
    }, [flash, toast]);

    return (
        <>
            <Head title={title} />
            <SidebarProvider>
                <AppSidebar user={auth.user} />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            <CustomBreadcrumb />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
            <Toaster position="top-right" />
        </>
    );
}
