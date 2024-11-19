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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Settings,
  Newspaper,
  MessageCircleIcon,
  Lock,
} from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {
  const mainItems = [
    {
      url: "/dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      url: "/dashboard/posts",
      title: "Posts",
      icon: Newspaper,
    },
    {
      url: "/dashboard/comments",
      title: "Comments",
      icon: MessageCircleIcon,
    },
  ];
  const settingsItems = [
    {
      url: "/dashboard/address",
      title: "Permission",
      icon: Lock,
    },
    {
      url: "/dashboard/profile",
      title: "User Settings",
      icon: Settings,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="justify-center items-center flex">
        <h1>RBAC Admin</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
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
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
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
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
