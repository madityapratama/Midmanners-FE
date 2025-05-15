// pages/seller/profil.tsx
import { useRouter } from 'next/router';
import { Pencil, Tag, List, Loader, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function SellerProfileViews() {
  const router = useRouter();

  // TODO: Ganti dengan panggilan API misalnya GET /api/seller/profile
  const sellerData = {
    name: 'Nama Penjual/Toko', // TODO: Ambil nama toko dari API
    coverImage: '', // TODO: Gunakan URL foto sampul dari API
    avatarImage: '', // TODO: Gunakan URL foto profil dari API
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f6] font-poppins text-indigo-950">
      
      {/* ======================= Foto Sampul ======================= */}
      <div className="relative bg-gray-700 text-white text-center min-h-[300px] flex flex-col items-center justify-center">
        {/* TODO: Ganti bg-gray-700 dengan <img src={sellerData.coverImage} /> jika sudah ada foto sampul */}

        {/* Tombol Edit Profil - kanan bawah foto sampul */}
        <button
          className="absolute bottom-4 right-4 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-poppins font-medium hover:bg-white transition backdrop-blur-sm flex items-center gap-2"
          onClick={() => router.push('/seller/edit')}
        >
          <Pencil size={16} />
          Edit Profil
        </button>
      </div>

      {/* ======================= Konten ======================= */}
      <div className="px-6 pt-6">
        {/* ======================= Info Profil ======================= */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            
            {/* Foto Profil */}
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm overflow-hidden">
              {/* TODO: Ganti dengan <img src={sellerData.avatarImage} alt="Profile" /> */}
              Profile
            </div>

            {/* Nama Toko / Username */}
            <h2 className="text-2xl font-bold">
              {/* TODO: Ambil nama dari sellerData.name */}
              {sellerData.name}
            </h2>
          </div>
        </div>

        <hr className="my-6 border-indigo-950" />

        {/* ======================= Menu Aktivitas Penting ======================= */}
        <h3 className="text-lg font-semibold mb-4">Aktivitas Penting</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
          <div onClick={() => navigateTo('/seller/buatProduk')} className="cursor-pointer">
            <Tag className="mx-auto mb-2" size={24} />
            <p className="text-xs">Buat Produk Dagangan</p>
          </div>

          <div onClick={() => navigateTo('/seller/daftarDagangan')} className="cursor-pointer">
            <List className="mx-auto mb-2" size={24} />
            <p className="text-xs">Daftar Dagangan</p>
          </div>

          <div onClick={() => navigateTo('/seller/penting/perlu-diproses')} className="cursor-pointer">
            <Loader className="mx-auto mb-2" size={24} />
            <p className="text-xs">Perlu Diproses</p>
          </div>

          <div onClick={() => navigateTo('/seller/penting/menunggu-konfirmasi')} className="cursor-pointer">
            <Clock className="mx-auto mb-2" size={24} />
            <p className="text-xs">Menunggu Konfirmasi</p>
          </div>

          <div onClick={() => navigateTo('/seller/penting/pesanan-selesai')} className="cursor-pointer">
            <CheckCircle className="mx-auto mb-2" size={24} />
            <p className="text-xs">Pesanan Selesai</p>
          </div>

          <div onClick={() => navigateTo('/seller/penting/dibatalkan')} className="cursor-pointer">
            <XCircle className="mx-auto mb-2" size={24} />
            <p className="text-xs">Dibatalkan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
