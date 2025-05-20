// pages/seller/profil.tsx
import { useRouter } from 'next/router';
import { Pencil, Tag, List, Loader, CheckCircle, XCircle, Clock, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SellerProfileViews() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const sellerData = {
    name: 'Nama Penjual/Toko',
    coverImage: '',
    avatarImage: '',
    joinDate: 'Bergabung sejak Januari 2023',
    rating: 4.8,
    totalProducts: 42,
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    setIsLoading(true);
    // Simulasi proses logout
    setTimeout(() => {
      router.push('/auth/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f6] font-poppins text-indigo-950 pb-10">
      {/* Foto Sampul */}
      <div className="relative bg-gray-700 text-white h-[200px] sm:h-[250px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => router.push('/seller/edit')}
            className="bg-white/80 text-indigo-950 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Pencil size={16} />
            Edit Profil
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="px-4 sm:px-6 pt-6 max-w-6xl mx-auto">
        {/* Info Profil */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 -mt-12 border-4 border-white rounded-full bg-gray-300 flex items-center justify-center text-white text-sm overflow-hidden shadow-lg">
              {/* Placeholder avatar - bisa diganti dengan gambar */}
              <div className="w-full h-full bg-indigo-950/30 flex items-center justify-center">
                <span className="text-2xl font-bold">P</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-calsans">{sellerData.name}</h2>
              <p className="text-sm text-indigo-950/80">{sellerData.joinDate}</p>
              <div className="flex items-center mt-1 gap-2">
                <div className="flex items-center bg-indigo-950/5 px-2 py-1 rounded-full">
                  <span className="text-sm font-medium">⭐ {sellerData.rating}</span>
                </div>
                <div className="flex items-center bg-indigo-950/5 px-2 py-1 rounded-full">
                  <span className="text-sm font-medium">📦 {sellerData.totalProducts} Produk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-indigo-950/20" />

        {/* Menu Aktivitas */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg mb-4 font-calsans">Aktivitas Toko</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center font-poppins">
            {[
              { icon: <Tag size={30} className="mx-auto" />, label: 'Buat Jualan', path: '/seller/buatJualan' },
              { icon: <List size={30} className="mx-auto" />, label: 'Daftar Jualan', path: '/seller/daftarJualan' },
              { icon: <Loader size={30} className="mx-auto" />, label: 'Perlu Diproses', path: '/seller/aktivitas?tab=perluDiproses' },
              { icon: <Clock size={30} className="mx-auto" />, label: 'Menunggu Konfirmasi', path: '/seller/aktivitas?tab=menungguKonfirmasi' },
              { icon: <CheckCircle size={30} className="mx-auto" />, label: 'Pesanan Selesai', path: '/seller/aktivitas?tab=pesananSelesai' },
              { icon: <XCircle size={30} className="mx-auto" />, label: 'Dibatalkan', path: '/seller/aktivitas?tab=dibatalkan' },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => navigateTo(item.path)}
                className="cursor-pointer p-4 rounded-xl bg-[#f2f2f6] hover:bg-indigo-950 hover:text-white transition-all group"
              >
                <div className="flex flex-col items-center justify-center text-indigo-950 mb-2 group-hover:text-white">
                  {item.icon}
                </div>
                <p className="text-xs font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Logout */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-950 text-white rounded-full hover:bg-indigo-900 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader size={16} className="animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <LogOut size={16} />
                Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}