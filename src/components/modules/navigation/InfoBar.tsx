"use client";
import LogOutButton from "@/components/common/LogOutButton";
import { ModeToggle } from "@/components/common/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, Settings, User } from "lucide-react";

interface InfoBarProps {}
const InfoBar: React.FC<InfoBarProps> = ({}) => {
  return (
    <div className="w-full h-[60px] flex items-center px-6 border-b border-border justify-between bg-background/80 p-4 backdrop-blur-md">
      <SidebarTrigger />
      <div>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>

            <LogOutButton>
              <DropdownMenuItem className="text-destructive">
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </LogOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default InfoBar;
