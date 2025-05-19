import {User,Clock } from "lucide-react";

const MidmanSidebar = () => (
  <ul>
    <SidebarItem
      icon={<User size={20} />}
      text="List User"
      href="/midman/list-user"
    />
    <SidebarItem
      icon={<Clock size={20} />}
      text="Semua Transaksi"
      href="/midman/semua-transaksi"
    />
  </ul>
);

const SidebarItem = ({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) => (
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

export default MidmanSidebar;
