"use client";

import { deleteSession } from "@/lib/jwt";
import { UNAUTHORIZED_REDIRECT_ROUTE } from "@/routes";
import { useRouter } from "next/navigation";

interface LogOutButtonProps {
  children: React.ReactNode;
}
const LogOutButton: React.FC<LogOutButtonProps> = ({ children }) => {
  const router = useRouter();
  const signOut = async () => {
    await deleteSession();
    router.push(UNAUTHORIZED_REDIRECT_ROUTE);
  };
  return <div onClick={signOut}>{children}</div>;
};
export default LogOutButton;
