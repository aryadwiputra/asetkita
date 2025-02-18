import * as React from "react";
import {
    BookOpen,
    Bot,
    Command,
    Frame,
    HomeIcon,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SettingsIcon,
    Shield,
    ShieldIcon,
    SquareTerminal,
    UserCog,
    UserRoundCogIcon,
    Users2Icon,
} from "lucide-react";

import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@/types"; // Import type User
import ApplicationLogo from "@/Components/ApplicationLogo/Index";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User; // Tambahkan prop user
}

const data = {
    navMain: [
        {
            group: "Dashboard", // Kategori grup
            items: [
                {
                    title: "Dashboard",
                    icon: HomeIcon,
                    url: "/dashboard",
                },
            ],
        },
        {
            group: "User Management", // Kategori grup
            items: [
                {
                    title: "Users",
                    url: "/dashboard/users",
                    icon: Users2Icon,
                },
                {
                    title: "Permissions",
                    url: "/dashboard/permissions",
                    icon: ShieldIcon,
                },
                {
                    title: "Roles",
                    url: "/dashboard/roles",
                    icon: UserRoundCogIcon,
                },
            ],
        },
        {
            group: "System Settings", // Kategori grup
            items: [
                {
                    title: "Setting",
                    icon: SettingsIcon,
                    url: "/dashboard/settings",
                },
            ],
        },
        // {
        //     group: "Master Data", // Kategori grup
        //     items: [
        //         {
        //             title: "Projects",
        //             url: "/projects",
        //             icon: Frame,
        //         },
        //         {
        //             title: "Sales & Marketing",
        //             url: "/sales-marketing",
        //             icon: PieChart,
        //         },
        //     ],
        // },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    // Terima prop user
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <ApplicationLogo size="size-8" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} /> {/* Gunakan data user dari prop */}
            </SidebarFooter>
        </Sidebar>
    );
}
