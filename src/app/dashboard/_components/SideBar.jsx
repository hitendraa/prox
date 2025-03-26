"use client"

import { CoinsIcon, Grid2X2, UserCircle, Settings, Film, History, Crown, Timer } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import React, { useContext } from "react"
import { UserDetailContext } from "@/_context/UserDetailContext"
import { usePathname } from "next/navigation"
import CreateButton from './CreateButton'

function SideBar() {
  const pathname = usePathname()

  const MenuOptions = [
    {
      name: 'Dashboard',
      icon: Grid2X2,
      path: '/dashboard'
    },
    {
      name: 'History',
      icon: History,
      path: '/dashboard/history'
    },
    {
      name: 'Buy Credits',
      icon: CoinsIcon,
      path: '/buy-credits'
    },
    {
      name: 'Premium',
      icon: Crown,
      path: '/dashboard/premium'
    },
    {
      name: 'Profile',
      icon: UserCircle,
      path: '/dashboard/profile'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings'
    },
  ]

  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  // Get available credits from user details
  const availableCredits = userDetail.credits || 0

  return (
    <Sidebar 
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <SidebarContent className="flex flex-col h-[calc(100%-8rem)]">
        <div className="px-4 py-4">
          <CreateButton />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href={MenuOptions[0].path} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      pathname === MenuOptions[0].path ? "bg-accent/80 text-accent-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {React.createElement(MenuOptions[0].icon, {
                      className: `h-4 w-4 ${pathname === MenuOptions[0].path ? "text-accent-foreground" : "text-muted-foreground"}`
                    })}
                    <span>{MenuOptions[0].name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {MenuOptions.slice(1).map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.path} 
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === item.path ? "bg-accent/80 text-accent-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <item.icon className={`h-4 w-4 ${
                        pathname === item.path ? "text-accent-foreground" : "text-muted-foreground"
                      }`} />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-muted/10">
        <div className="p-4 space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground font-medium">Credits</span>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {availableCredits}
              </span>
            </div>
            <Progress value={availableCredits*10} className="h-1.5" />
          </div>
          <div className="rounded-lg border bg-card/50 p-3 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground mb-1">Available</p>
            <h3 className="text-lg font-bold">{10-availableCredits} credits</h3>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default SideBar