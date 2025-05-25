// pages/_app.tsx
import "@/styles/globals.css";
import '@sendbird/uikit-react/dist/index.css';
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/appShell";
import { AuthProvider } from "@/context/AuthContext";
import { CategoryProvider } from "@/context/CategoryContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CategoryProvider>
      <AppShell>
        <Component className='pt-16' {...pageProps} />
      </AppShell>
      </CategoryProvider>
    </AuthProvider>
  );
}