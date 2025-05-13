"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CircleUserRound, Home, Users, Search } from "lucide-react";

const Navbar = () => {
  const [activePage] = useState("");
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/buyer/profil");
  };

  const handleHomeClick = () => {
    router.push("/dashboard");
  };

  const handleGroupClick = () => {
    // kalau mau ke page lain untuk group, bisa tambahkan router.push('/groupPage') disini
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-indigo-950 shadow-md w-full">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 w-1/3">
        <span className="font-semibold text-lg text-zinc-200 font-calsans whitespace-nowrap">
          MIDMANNERS
        </span>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 text-zinc-200 py-2 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-text-zinc-400 text-sm transition-colors duration-300 ease-in-out"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-200 w-5 h-5 transition-colors duration-300 ease-in-out"/>
          </div>
        </div>

        {/* Center Navigation Icons */}
        <div className="flex items-center gap-8 flex-1 justify-center">
          <span
            onClick={handleHomeClick}
            className={`relative cursor-pointer p-2 rounded-full`}
          >
            <Home className="w-6 h-6 text-zinc-200 hover:text-zinc-400 transition-colors duration-300 ease-in-out" />
          </span>
          <span
            onClick={handleGroupClick}
            className={`relative cursor-pointer p-2 rounded-full `}
          >
            <Users className="w-6 h-6 text-zinc-200 hover:text-zinc-400 transition-colors duration-300 ease-in-out" />
          </span>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 flex-1 justify-end text-gray-600">
          <Bell className="w-6 h-6 cursor-pointer text-zinc-200 hover:text-zinc-400 transition-colors duration-300 ease-in-out
" />
          <CircleUserRound
            className={`w-6 h-6 cursor-pointer text-zinc-200 hover:text-zinc-400 transition-colors duration-300 ease-in-out${
              activePage === "profile" ? "text-blue-500" : ""
            }`}
            onClick={handleProfileClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
