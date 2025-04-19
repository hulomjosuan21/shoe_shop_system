import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main>
            <div className="sidebar-trigger">
                <SidebarTrigger />
            </div>
            <section className="">
                {children}
            </section>
        </main>
    )
}