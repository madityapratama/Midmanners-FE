import { useEffect, useState } from 'react';
import SendBird from 'sendbird';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';

const sb = new SendBird({ appId: process.env.NEXT_PUBLIC_SENDBIRD_APP_ID });

export default function ChatPage() {
  const { profile } = useAuth();

  // ⛔ stop di sini kalau profile belum siap
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ✅ semua hook dimulai hanya setelah profile pasti ada
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    sb.connect(`user_${profile.id}`, (user, error) => {
      if (error) return console.error(error);
      sb.OpenChannel.getChannel('YOUR_CHANNEL_URL', (channel, error) => {
        if (error) return console.error(error);
        setChannel(channel);
        channel.enter(() => {
          channel.getMessagesByTimestamp(Date.now(), true, 30, true, 'MESG', (msgList, error) => {
            if (error) return console.error(error);
            setMessages(msgList);
          });
        });
      });
    });
  }, [profile.id]);

  const sendMessage = () => {
    if (!input.trim() || !channel) return;
    channel.sendUserMessage(input, (message, error) => {
      if (error) return console.error(error);
      setMessages([...messages, message]);
      setInput('');
    });
  };

  return (
    <>
      <Head><title>Chat</title></Head>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`bg-gray-100 w-64 p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <h2 className="text-lg font-bold">Sidebar</h2>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <h1 className="text-xl font-semibold">Chat</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg) => (
              <div key={msg.messageId} className="bg-gray-200 p-2 rounded-md max-w-sm">
                {msg.message}
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-2"
              placeholder="Type message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage} className="bg-indigo-500 text-white px-4 rounded">Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
