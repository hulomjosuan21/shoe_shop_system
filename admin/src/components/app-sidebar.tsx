import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar"
import { ChartNoAxesGantt, LayoutDashboard, Pocket, ChartBarStacked, ChartLine, UsersRound, Settings } from "lucide-react"
import Link from "next/link"


const items_product = [
    {
        title: "Shoes",
        url: "/pages/shoes",
        icon: ChartNoAxesGantt,
    },
    {
        title: "Brands",
        url: "/pages/brands",
        icon: Pocket,
    },
    {
        title: "Categories",
        url: "/pages/categories",
        icon: ChartBarStacked,
    }
]
export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/">
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/sales">
                                    <ChartLine />
                                    <span>Sales</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarGroupLabel>Products</SidebarGroupLabel>
                            {items_product.map((item) => (
                                <SidebarMenuSub key={item.title}>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            ))}
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>


                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard">
                                    <UsersRound />
                                    <span>Customers</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/pages/settings">
                                    <Settings />
                                    <span>Settings</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
