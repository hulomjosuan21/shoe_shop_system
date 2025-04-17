import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ClientProvider from "@/providers/ClientProvider";
import { Toaster } from "sonner";
import { HeaderPageLister } from "@/components/page-listen-header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoe Shop Admin",
  description: "Developer - Josuan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider className="with-sidebar">
            <AppSidebar />
            <main>
              <div className="sidebar-trigger">
                <SidebarTrigger />
                <HeaderPageLister />
              </div>
              <ClientProvider>
                {children}
              </ClientProvider>
            </main>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
