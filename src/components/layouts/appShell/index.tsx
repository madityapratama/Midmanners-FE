import { useRouter } from "next/router";
import Navbar from "@/components/layouts/navbar";
import Head from "next/head";
import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";


const disableNavbarPaths = [
  "/auth/login",
  "/auth/signUp",
  "/auth/resetPassword",
  "/auth/otp",
  "/auth/newPassword",
  "/",
  "/buyer/aktivitas",
  "/auth/otpRegister",
  "/buyer/edit",
  "/seller/edit",
  "/daftarSeller",
  "/seller/aktivitas",
  "/payment/*"
];

const generatePageTitle = (path: string) => {
  if (path === "/") return "Welcome to MidManners";
  
  const segments = path.split("/")
    .filter(Boolean)
    .map(segment => 
      segment
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase())
    );
  
  return segments.join(" | ") + " | MidManners";
};

type AppShellProps = {
  children: ReactNode;
  className?: string;
};

const AppShell = ({ children, className = "" }: AppShellProps) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show sidebar only on dashboard pages
  const showSidebar = pathname.startsWith("/dashboard");

  const showNavbar = !disableNavbarPaths.some(path => 
    path.endsWith("*") ? pathname.startsWith(path.slice(0, -1)) : pathname === path
  );

  return (
    <>
      <Head>
        <title>{generatePageTitle(pathname)}</title>
        <meta name="description" content={`MidManners - ${generatePageTitle(pathname)}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Mobile Sidebar Toggle Button */}
      {showSidebar && (
        <button
          className="md:hidden fixed top-18 right-4 z-50 p-3 rounded-full bg-indigo-700 text-white shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div className={`fixed top-0 left-0 h-full bg-indigo-900 shadow-lg overflow-y-auto transition-all duration-300 z-40
          ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-64'}`}
        >
          <Sidebar />
        </div>
      )}
      
      <main className={`min-h-screen ${className}`}>
        {showNavbar && <Navbar />}
        <div className={`transition-all duration-300 ${
          showNavbar ? '' : 'pt-0'
        } ${
          showSidebar ? 'md:ml-64' : ''
        }`}>
          {children}
        </div>
      </main>
    </>
  );
};

export default AppShell;