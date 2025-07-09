// pages/_app.tsx
import "@/styles/globals.css";
// import '@sendbird/uikit-react/dist/index.css';
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/appShell";
import { AuthProvider } from "@/context/AuthContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { SearchProvider } from "@/context/SearchContext";
import AblyNotifListener from "@/components/AblyNotifListener";
import { useAuth } from "@/context/AuthContext";

function GlobalWrapper({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();

  return (
    <>
      {profile?.id && <AblyNotifListener userId={profile.id} />}
      {children}
      {/* You can add more global components here, like a footer or a modal */}
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SearchProvider>
        <CategoryProvider>
          <AppShell>
            <GlobalWrapper>
              {/* You can add global components here, like a header or a sidebar */}
              <Component {...pageProps} />
            </GlobalWrapper>
          </AppShell>
        </CategoryProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
