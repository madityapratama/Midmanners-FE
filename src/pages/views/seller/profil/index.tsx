// pages/seller/profil.tsx
import { useRouter } from 'next/router';
import { Pencil, Tag, List, Loader, CheckCircle, XCircle, Clock, LogOut, } from 'lucide-react';

export default function SellerProfileViews() {
  const router = useRouter();

  const sellerData = {
    name: 'Nama Penjual/Toko',
    coverImage: '',
    avatarImage: '',
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    // TODO: Tambahkan logika logout sesuai kebutuhan (hapus token, redirect, dll.)
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-[#f2f2f6] font-poppins text-indigo-950">
      {/* Foto Sampul */}
      <div className="relative bg-gray-700 text-white text-center min-h-[300px] flex flex-col items-center justify-center">
        {/* TODO: Ganti bg-gray-700 dengan <img src={sellerData.coverImage} /> */}
        <button
          className="absolute bottom-4 right-4 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-white transition backdrop-blur-sm flex items-center gap-2"
          onClick={() => router.push('/seller/edit')}
        >
          <Pencil size={16} />
          Edit Profil
        </button>
      </div>

      {/* Konten */}
      <div className="px-6 pt-6">
        {/* Info Profil */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm overflow-hidden">
              Profile
            </div>
            <h2 className="text-2xl font-bold font-calsans">{sellerData.name}</h2>
          </div>
        </div>

        <hr className="my-6 border-indigo-950" />

        {/* Menu Aktivitas */}
        <h3 className="text-lg mb-4 font-calsans">Aktivitas</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center font-poppins">
          {[
            { icon: <Tag size={30} />, label: 'Buat Jualan', path: '/seller/buatJualan' },
            { icon: <List size={30} />, label: 'Daftar Jualan', path: '/seller/daftarJualan' },
            { icon: <Loader size={30} />, label: 'Perlu Diproses', path: '/seller/aktivitas?tab=perluDiproses' },
            { icon: <Clock size={30} />, label: 'Menunggu Konfirmasi', path: '/seller/aktivitas?tab=menungguKonfirmasi' },
            { icon: <CheckCircle size={30} />, label: 'Pesanan Selesai', path: '/seller/aktivitas?tab=pesananSelesai' },
            { icon: <XCircle size={30} />, label: 'Dibatalkan', path: '/seller/aktivitas?tab=dibatalkan' },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => navigateTo(item.path)}
              className="cursor-pointer p-2 rounded-lg hover:bg-white hover:shadow-md transition-all transform hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center text-indigo-950 mb-2">
                {item.icon}
              </div>
              <p className="text-xs font-medium">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tombol Logout */}
        <div className="mt-10 flex justify-center bg-white pb-10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-950 text-white rounded-full hover:bg-red-600 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
