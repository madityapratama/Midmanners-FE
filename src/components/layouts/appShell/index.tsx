import { useRouter } from "next/router";
import Navbar from "@/components/layouts/navbar";
import Head from "next/head";
import { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

const disableNavbar = [
  "/auth/login",
  "/auth/signUp",
  "/auth/resetPassword",
  "/auth/otp",
  "/auth/newPassword",
  "/",
  "/buyer/aktivitas",
  "/auth/otpRegister",
  "/buyer/edit",
  "/daftarSeller",
];

function generateTitle(path: string) {
  if (path === "/") return "Landing Page";
  const segments = path.split("/").filter(Boolean);
  return segments
    .map((seg) =>
      seg
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .join(" | ");
}

const AppShell = ({ children }: AppShellProps) => {
  const { pathname } = useRouter();
  const pageTitle = generateTitle(pathname);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`This is the ${pageTitle} page of My Website`}
        />
      </Head>
      <main>
        {!disableNavbar.includes(pathname) && <Navbar />}
        {children}
      </main>
    </>
  );
};

export default AppShell;
