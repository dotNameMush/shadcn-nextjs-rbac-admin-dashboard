import { ModeToggle } from "@/components/common/ModeToggle";
import UserButton from "@/components/common/UserButton";
import Link from "next/link";

interface SiteHeaderProps {}
const SiteHeader: React.FC<SiteHeaderProps> = ({}) => {
  return (
    <header className="h-16 w-full flex bg-muted items-center px-6 md:px-[15%] justify-between">
      <aside>
        <Link href={"/"}>
          <h1 className="text-xl">Logo</h1>
        </Link>
      </aside>
      <aside className="space-x-2">
        <ModeToggle />
        <UserButton />
      </aside>
    </header>
  );
};
export default SiteHeader;
