import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/appShell";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </AuthProvider>
  );
}
