// pages/_app.tsx
import "@/styles/globals.css";
import '@sendbird/uikit-react/dist/index.css';
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/appShell";
import { AuthProvider } from "@/context/AuthContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { SearchProvider } from "@/context/SearchContext";
import '@/styles/sendbird.css'; // custom halaman chat


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SearchProvider>
      <CategoryProvider>
      <AppShell>
        <Component  {...pageProps} />
      </AppShell>
      </CategoryProvider>
      </SearchProvider>
    </AuthProvider>
  );
}