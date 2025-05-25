// import { useAuth } from "@/context/AuthContext";
// import AdminSidebar from "@/components/sidebarItems/AdminSidebar";
// import MidmanSidebar from "@/components/sidebarItems/MidmanSidebar";
// import DefaultSidebar from "@/components/sidebarItems/DefaultSidebar";

// const Sidebar = () => {
//   const { user } = useAuth();

//   if (user?.role === "admin") return <AdminSidebar />;
//   if (user?.role === "midman") return <MidmanSidebar />;
//   return <DefaultSidebar />;
// };

// export default Sidebar;


import { 
  User, 
  FileClock, 
  Repeat, 
  LayoutPanelTop, 
  Clock,
  Home,
  MessageSquare,
  Settings
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { CategoryProvider, useCategory } from "@/context/CategoryContext";


type Category = {
  id: number;
  category_name: string;
};

const SidebarItem = ({
  icon,
  text,
  href,
  count,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  count?: number;
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;


  return (
    <li>
      <Link href={href} legacyBehavior>
        <a className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
          isActive
            ? 'bg-indigo-700 text-white'
            : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-indigo-300">{icon}</span>
            <span>{text}</span>
          </div>
          {count && (
            <span className="bg-white text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </a>
      </Link>
    </li>
  );
};

const AdminSidebar = () => {
  return (
    <nav className="flex-1 overflow-y-auto p-2">
      <ul className="space-y-1">
        <SidebarItem
          icon={<User size={18} />}
          text="List User"
          href="/listUser"
        />
        <SidebarItem
          icon={<FileClock size={18} />}
          text="Postingan Menunggu Persetujuan"
          href="/menungguPersetujuanPostingan"
        />
      </ul>
    </nav>
  );
};

const MidmanSidebar = () => {
  return (
    <nav className="flex-1 overflow-y-auto p-2">
      <ul className="space-y-1">
        <SidebarItem
          icon={<User size={18} />}
          text="List User"
          href="/listUser"
        />
        <SidebarItem
          icon={<Clock size={18} />}
          text="Semua Transaksi"
          href="/semuaTransaksi"
        />
      </ul>
    </nav>
  );
};

const DefaultSidebar = () => {

  const {selectedCategory,setSelectedCategory} = useCategory();
  const [categories,setCategories] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    console.log('trigger handleCategory');
    if(selectedCategory === category){
      setSelectedCategory(null);
    } else{
      setSelectedCategory(category);
    }
  };

  return (

    <nav className="flex-1 overflow-y-auto p-2 ">
      <h2 className="text-lg font-semibold text-white px-3 py-2 mb-1">Kategori</h2>
      <ul className="space-y-1">
        {categories?.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'
              }`}
            >
              <LayoutPanelTop className="w-5 h-5 text-indigo-300" />
              <span>{category.category_name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="h-full flex flex-col bg-indigo-900 pt-16">
      {/* Logo/Header */}
      <div className="p-4 border-b border-indigo-700">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-white text-indigo-800 rounded-md px-2 py-1">MID</span>
          MANNERS
        </h1>
      </div>

      {/* Dynamic Sidebar Content */}
      {user?.role === "admin" ? (
        <AdminSidebar />
      ) : user?.role === "midman" ? (
        <MidmanSidebar />
      ) : (
        <DefaultSidebar />
      )}

    </div>
  );
};

export default Sidebar;