import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SearchForm } from "./search-form"
import Link from "next/link"
import { ChartBarStacked, ChartSpline, ClipboardMinus, Footprints, LayoutDashboard, Pocket, SendToBack, UsersRound } from "lucide-react"
import { AppSidebarHeader } from "./sidebar-header"
import { NavUser } from "./nav-user"

const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            url: "#",
            items: [
                {
                    title: "Dashboard",
                    url: "/",
                    icon: LayoutDashboard
                },
                {
                    title: "Sales",
                    url: "/pages/sales",
                    icon: ChartSpline
                },
                {
                    title: "Orders",
                    url: "/",
                    icon: SendToBack
                }
            ],
        },
        {
            title: "Catalogs",
            url: "#",
            items: [
                {
                    title: "Shoes",
                    url: "/pages/catalogs/shoe",
                    icon: Footprints
                },
                {
                    title: "Brands",
                    url: "/pages/catalogs/brand",
                    icon: Pocket
                },
                {
                    title: "Categories",
                    url: "/pages/catalogs/category",
                    icon: ChartBarStacked
                }
            ],
        },
        {
            url: "#",
            items: [
                {
                    title: "Customers",
                    url: "/pages/shoes",
                    icon: UsersRound
                },
                {
                    title: "Reports",
                    url: "/",
                    icon: ClipboardMinus
                }
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <AppSidebarHeader />
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((item, index) => (
                    <SidebarGroup key={index} className="border-b">
                        {item.title && <SidebarGroupLabel>{item.title}</SidebarGroupLabel>}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
