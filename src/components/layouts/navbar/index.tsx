"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CircleUserRound, MessageCircleMore, Home, Users, Search } from "lucide-react";

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
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md w-full">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Search Bar */}
        <div className="flex items-center gap-2 flex-1 w-1/3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Center Navigation Icons */}
        <div className="flex items-center gap-8 flex-1 justify-center">
          <span
            onClick={handleHomeClick}
            className={`relative cursor-pointer p-2 rounded-full hover:text-blue-500 ${
              activePage === "home" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <Home className="w-6 h-6" />
            {activePage === "home" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full mt-1" />
            )}
          </span>
          <span
            onClick={handleGroupClick}
            className={`relative cursor-pointer p-2 rounded-full hover:text-blue-500  ${
              activePage === "group" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <Users className="w-6 h-6" />
            {activePage === "group" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full mt-1" />
            )}
          </span>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 flex-1 justify-end text-gray-600">
          <MessageCircleMore className="w-6 h-6 cursor-pointer hover:text-blue-500" />
          <Bell className="w-6 h-6 cursor-pointer hover:text-blue-500" />
          <CircleUserRound
            className={`w-6 h-6 cursor-pointer hover:text-blue-500 ${
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
