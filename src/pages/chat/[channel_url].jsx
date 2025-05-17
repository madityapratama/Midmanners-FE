import { useRouter } from 'next/router';
import SendbirdApp from '@sendbird/uikit-react/App';

export default function ChatPage() {
  const router = useRouter();
  const { channel_url, target_user_name, target_user_avatar } = router.query;

  // User Login Info (contoh dari local storage atau JWT kamu)
  const currentUserId = 'user_' + localStorage.getItem('user_id'); // pastikan sama dengan user_id di Laravel kamu
  const currentUserName = localStorage.getItem('user_name');

  return (
    <div style={{ height: '100vh' }}>
      {/* Custom Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f3f3f3'
      }}>
        <img src={target_user_avatar} alt="avatar" width={40} height={40} style={{ borderRadius: '50%', marginRight: '10px' }} />
        <h2>{target_user_name}</h2>
      </div>

      {/* Sendbird UIKit App */}
      <SendbirdApp
        appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}
        userId={currentUserId}
        nickname={currentUserName}
        theme="light"
        channelUrl={channel_url}
      />
    </div>
  );
}
