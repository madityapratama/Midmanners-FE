import { User, FileClock, Repeat } from "lucide-react";

const AdminSidebar = () => {
  return (
    <ul>
      <SidebarItem icon={<User size={20} />} text="List User" href="/listUser"/>
      <SidebarItem
        icon={<FileClock size={20} />}
        text="Postingan Menunggu Persetujuan"
        href="/menungguPersetujuanPostingan"
      />
      <SidebarItem
        icon={<Repeat size={20} />}
        text="Pengajuan Menjadi Seller"
        href="/pengajuanMenjadiSeller"
      />
    </ul>
  );
};

const SidebarItem = ({icon,text,href,}: {icon: React.ReactNode;text: string;href: string;}) => (
  <li>
    <a
      href={href}
      className="flex items-center gap-2 text-zinc-900 hover:text-indigo-800 font-semibold mb-4"
    >
      {icon}
      {text}
    </a>
  </li>
);

export default AdminSidebar;
