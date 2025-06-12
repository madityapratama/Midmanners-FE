import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '@sendbird/uikit-react/dist/index.css';

const SendbirdApp = dynamic(() => import('@sendbird/uikit-react/App'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <div className=" rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  ),
});

export default function ChatDashboard() {
  const { profile } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [showChannelList, setShowChannelList] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setShowChannelList(!isMobileView); // Show on desktop, hide on mobile
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Chat | MidManners</title>
        <meta name="description" content="Connect with your community" />
        <style>{`
          /* Mobile Optimization */
          @media (max-width: 767px) {
            .sendbird-app__wrap {
              flex-direction: column !important;
              height: calc(100vh - 4rem) !important;
            }
            
            .sendbird-app__channellist-wrap {
              position: fixed !important;
              top: 4rem !important;
              left: 0 !important;
              width: 100% !important;
              height: calc(100% - 4rem) !important;
              transform: ${showChannelList ? 'translateX(0)' : 'translateX(-100%)'} !important;
              transition: transform 0.3s ease !important;
              z-index: 100 !important;
              background: white !important;
            }
            
            .sendbird-app__conversation-wrap {
              width: 100% !important;
              margin-left: 0 !important;
            }
            
            .sendbird-channel-header__right-icon {
              display: none !important;
            }
          }
        `}</style>
      </Head>

      <div className="h-screen pt-16">
        {/* Mobile Toggle Button */}
        {isMobile && (
          <button
            className="fixed z-50 bottom-10 right-20 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setShowChannelList(!showChannelList)}
            aria-label={showChannelList ? "Hide channel list" : "Show channel list"}
          >
            {showChannelList ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        <SendbirdApp
          appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}
          userId={`user_${profile?.id}`}
          nickname={profile?.name}
          theme="light"
          config={{
            isMessageGroupingEnabled: true,
            onChannelSelect: () => {
              if (isMobile) setShowChannelList(false);
            },
          }}
          uikitOptions={{
            renderChannelList: ({ ChannelList }) => (
              <ChannelList 
                onChannelSelect={() => {
                  if (isMobile) setShowChannelList(false);
                }}
              />
            ),
          }}
          mobileView={isMobile}
        />
      </div>
    </>
  );
}