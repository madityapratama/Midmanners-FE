export default function CustomRenderChannelList({ ChannelList, isMobile, showChannelList }) {
  if (!ChannelList) return null;

  return (
    <div
      className={`${
        isMobile ? 'fixed top-0 left-0 h-full w-[280px] bg-white z-20 shadow-lg overflow-y-auto' : ''
      }`}
      style={{
        transform: showChannelList ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <ChannelList />
    </div>
  );
}
