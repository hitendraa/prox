import { cookies } from "next/headers"
import { SidebarProvider } from "@/components/ui/sidebar"
import SideBar from "./_components/SideBar"
import Header from "@/components/Header"

const DashboardLayout = async ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="relative min-h-screen">
        <Header />
        <div className="flex pt-16">
          <SideBar />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
export default DashboardLayout