import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import '@sendbird/uikit-react/dist/index.css';

const SendbirdApp = dynamic(() => import('@sendbird/uikit-react/App'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <div className="rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 animate-spin"></div>
    </div>
  ),
});

export default function ChatDashboard() {
  const { profile } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [showChannelList, setShowChannelList] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setShowChannelList(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!profile || !hasMounted) {
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <style>{`
          /* Mobile Optimization */
          @media (max-width: 767px) {
            .sendbird-app__wrap {
              flex-direction: column !important;
              height: calc(100vh - 4rem) !important;
            }

            .sendbird-channel-settings {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 50 !important;
      background-color: white !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    .sendbird-channel-settings__panel {
      padding: 1rem !important;
      overflow-y: auto !important;
      height: 100% !important;
    }

    .sendbird-channel-settings__close-icon {
      top: 1rem !important;
      right: 1rem !important;
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
              box-shadow: ${showChannelList ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'} !important;
            }
            
            .sendbird-app__conversation-wrap {
              width: 100% !important;
              margin-left: 0 !important;
            }
            
            .sendbird-channel-header__right-icon {
              display: flex !important;
              align-items: center;
            }
            
            .sendbird-channel-header__right-icon button {
              padding: 8px !important;
              margin-right: 8px !important;
            }
          }

          /* Tablet Optimization */
          @media (min-width: 768px) and (max-width: 1023px) {
            .sendbird-app__channellist-wrap {
              width: 280px !important;
            }
            
            .sendbird-app__conversation-wrap {
              width: calc(100% - 280px) !important;
            }
          }

          /* Improve mobile input */
          .sendbird-message-input {
            padding-bottom: env(safe-area-inset-bottom) !important;
          }
        `}</style>
      </Head>

      <div className="h-screen pt-16 bg-gray-50">
        {/* Mobile Toggle Buttons */}
        {isMobile && (
          <>
            <button
              className={`fixed z-50 bottom-25 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all ${showChannelList ? 'rotate-90' : ''
                }`}
              onClick={() => setShowChannelList(!showChannelList)}
              aria-label={showChannelList ? "Hide channel list" : "Show channel list"}
            >
              {showChannelList ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Backdrop when channel list is open */}
            {showChannelList && (
              <div
                className="fixed inset-0 z-40 bg-opacity-50 md:hidden"
                onClick={() => setShowChannelList(false)}
              />
            )}
          </>
        )}

        <SendbirdApp
          appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}
          userId={`user_${profile?.id}`}
          nickname={profile?.name}
          profileUrl={profile?.avatar || ''}
          theme="light"
          config={{
            isMessageGroupingEnabled: true,
            onChannelSelect: () => {
              if (isMobile) setShowChannelList(false);
            },
            enableEmojiReactions: true,
            enableMention: true,
            enableOGTag: true,
            enableTypingIndicator: true,
          }}
          uikitOptions={{
            groupChannel: {
              enableOgtag: true,
              enableReactions: true,
              enableMention: true,
            },
            groupChannelList: {
              enableTypingIndicator: true,
              enableMessageReceiptStatus: true,
              renderChannelPreview: ({ channel, onLeaveChannel }) => (
                <div className="sendbird-channel-preview">
                  <div className="sendbird-channel-preview__content">
                    <div className="sendbird-channel-preview__title">
                      {channel.name || 'Group Chat'}
                    </div>
                    <div className="sendbird-channel-preview__last-message">
                      {channel.lastMessage?.message || 'No messages yet'}
                    </div>
                  </div>
                </div>
              ),
            },
            groupChannelSettings: {
              enableMention: true,
            },
          }}
          mobileView={isMobile}
        />
      </div>
    </>
  );
}