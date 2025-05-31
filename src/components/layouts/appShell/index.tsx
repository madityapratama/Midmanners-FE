// components/layouts/AppShell.tsx
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/navbar";
import Head from "next/head";
import { ReactNode } from "react";

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
  "/landingPage",
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
  const { pathname } = useRouter();
  const showNavbar = !disableNavbarPaths.some(path => 
    path.endsWith("*") ? pathname.startsWith(path.slice(0, -1)) : pathname === path
  );
  const isChatPage = pathname.startsWith("/chat");

  return (
    <>
      <Head>
        <title>{generatePageTitle(pathname)}</title>
        <meta name="description" content={`MidManners - ${generatePageTitle(pathname)}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={`min-h-screen ${className} `}>
        {showNavbar && <Navbar />}
        <div className={`${showNavbar ? 'pt-0' : 'pt-0'}`}>
          {children}
        </div>
      </main>
    </>
  );
};

export default AppShell;