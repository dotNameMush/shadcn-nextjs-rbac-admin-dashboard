import { DashboardSidebar } from "@/components/modules/navigation/DashboardSidebar";
import InfoBar from "@/components/modules/navigation/InfoBar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full flex flex-col h-screen overflow-hidden">
        <InfoBar />
        <div className="flex-1 h-full bg-muted p-4 overflow-y-scroll hide-scroll">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
export default DashboardLayout;
