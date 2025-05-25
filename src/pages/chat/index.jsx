// pages/chat/index.jsx
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import '@sendbird/uikit-react/dist/index.css';

const SendbirdApp = dynamic(() => import('@sendbird/uikit-react/App'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-screen">Loading chat...</div>,
});

export default function ChatDashboard() {
  const { profile } = useAuth();

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Chat | MidManners</title>
        <meta name="description" content="Connect with your community" />
      </Head>
      
      <div className="h-screen pt-16">
        <SendbirdApp
          appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}
          userId={`user_${profile.id}`}
          nickname={profile.name}
          theme="light"
          config={{
            isMessageGroupingEnabled: true,
          }}
        />
      </div>
    </>
  );
}