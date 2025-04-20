"use client"

import * as React from "react"
import {
    ChartLine,
    ChartNoAxesGantt,
    LayoutDashboard,
    MessageSquareWarning,
    SquareDashedBottom,
    SquareRoundCorner,
    UsersRound,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { SearchForm } from "./search-form"

const data = {
    header: {
        name: "Shoe Shop",
        logo: SquareDashedBottom,
        description: "Simple shoe shop",
    },
    navMain: [
        [
            {
                title: "Dashboard",
                url: "/",
                icon: LayoutDashboard,
                items: []
            },
            {
                title: "Sales",
                url: "/pages/sales",
                icon: ChartLine,
                items: []
            },
            {
                title: "Orders",
                url: "/",
                icon: SquareRoundCorner,
                items: []
            },
            {
                title: "Catalogs",
                url: "#",
                icon: ChartNoAxesGantt,
                isActive: true,
                items: [
                    {
                        title: "Shoe",
                        url: "/pages/catalogs/shoe",
                    },
                    {
                        title: "Brands",
                        url: "/pages/catalogs/brand",
                    },
                    {
                        title: "Categories",
                        url: "/pages/catalogs/category",
                    }
                ],
            },
        ],
        [
            {
                title: "Customers",
                url: "/",
                icon: UsersRound,
                items: []
            },
            {
                title: "Reports",
                url: "/",
                icon: MessageSquareWarning,
                items: []
            }
        ],
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <Link href="/">
                                    <data.header.logo className="h-5 w-5" />
                                    <span className="text-base font-semibold">{data.header.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                {
                    data.navMain.map((item, index) => (
                        <NavMain items={item} key={index} />
                    ))
                }
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
