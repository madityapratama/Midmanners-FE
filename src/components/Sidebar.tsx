import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/sidebarItems/AdminSidebar";
import MidmanSidebar from "@/components/sidebarItems/MidmanSidebar";
import DefaultSidebar from "@/components/sidebarItems/DefaultSidebar";

const Sidebar = () => {
  const { user } = useAuth();

  if (user?.role === "admin") return <AdminSidebar />;
  if (user?.role === "midman") return <MidmanSidebar />;
  return <DefaultSidebar />;
};

export default Sidebar;
