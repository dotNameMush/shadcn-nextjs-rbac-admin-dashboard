import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/jwt";
import { cn } from "@/lib/utils";
import { LogIn, User } from "lucide-react";
import LogOutButton from "./LogOutButton";
import Link from "next/link";
interface UserButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}
const UserButton: React.FC<UserButtonProps> = async ({
  className,
  ...props
}) => {
  const user = await getSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-full h-9 w-9", className)}
          {...props}
        >
          {user != undefined ? (
            <User className="h-4 w-4" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user && (
          <>
            <DropdownMenuItem className="cursor-pointer">
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive-foreground bg-destructive">
              <LogOutButton>Logout</LogOutButton>
            </DropdownMenuItem>
          </>
        )}
        {user == undefined && (
          <>
            <DropdownMenuItem className="cursor-pointer">
              <Link href={"/signup"}>Get Started</Link>
            </DropdownMenuItem>
            ,
            <DropdownMenuItem className="cursor-pointer">
              <Link href={"/signin"}>Sign In</Link>
            </DropdownMenuItem>
            ,
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
