// components/layouts/Navbar.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { Bell, CircleUserRound, Home, Users, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const [activePage] = useState("");
  const router = useRouter();

  const handleProfileClick = () => {
    if (!user) return;

    const profileRoutes = {
      buyer: "/buyer/profil",
      seller: "/seller/profil",
      midman: "/midman/profil",
      admin: "/admin/profil"
    };

    router.push(profileRoutes[user.role] || "/");
  };

  const handleHomeClick = () => router.push("/dashboard");
  const handleChatPage = () => router.push('/chat');

  const iconClass = "w-6 h-6 text-zinc-200 hover:text-indigo-300 transition-colors duration-200";
  const activeIconClass = "text-indigo-400";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-indigo-950 shadow-lg backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Search */}
          <div className="flex items-center space-x-4 flex-1">
            <h1 className="font-semibold text-xl text-zinc-100 font-calsans tracking-tight">
              MIDMANNERS
            </h1>
            
          </div>

          {/* Navigation Icons */}
          <nav className="flex items-center space-x-6 mx-4">
            <button 
              onClick={handleHomeClick}
              className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
              aria-label="Home"
            >
              <Home className={`${iconClass} ${activePage === 'home' ? activeIconClass : ''}`} />
            </button>
            <button
              onClick={handleChatPage}
              className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
              aria-label="Chat"
            >
              <Users className={`${iconClass} ${activePage === 'chat' ? activeIconClass : ''}`} />
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            {/* <button className="p-2 rounded-full hover:bg-indigo-800 transition-colors relative">
              <Bell className={iconClass} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button> */}
            <button
              onClick={handleProfileClick}
              className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
              aria-label="Profile"
            >
              <CircleUserRound className={`${iconClass} ${activePage === 'profile' ? activeIconClass : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;