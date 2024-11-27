import SiteHeader from "@/components/modules/navigation/Header";

interface UserLayoutProps {
  children: React.ReactNode;
}
const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  );
};
export default UserLayout;
