import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

interface Produk {
  id: number;
  nama: string;
  harga: number;
  kategori: string;
  gambar: string;
  status: 'menunggu' | 'disetujui' | 'terjual';
}

export default function DaftarJualanViews() {
  const router = useRouter();
  const [produkList, setProdukList] = useState<Produk[]>([]);

  useEffect(() => {
    // API: Ambil data produk milik seller
    // axios.get('/api/seller/produk')
    //   .then((res) => setProdukList(res.data))
    //   .catch((err) => console.error(err));

    // Dummy data sementara
    setProdukList([
      {
        id: 1,
        nama: 'Nama Produk Jualan',
        harga: 150000,
        kategori: 'Mobile Legends',
        gambar: '',
        status: 'menunggu',
      },
      {
        id: 2,
        nama: 'Nama Produk Jualan',
        harga: 150000,
        kategori: 'Free Fire',
        gambar: '',
        status: 'disetujui',
      },
      {
        id: 3,
        nama: 'Nama Produk Jualan',
        harga: 150000,
        kategori: 'Valorant',
        gambar: '',
        status: 'terjual',
      },
    ]);
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'menunggu':
        return 'Menunggu Di Setujui';
      case 'disetujui':
        return 'Sudah Di Setujui';
      case 'terjual':
        return 'Sudah Terjual';
      default:
        return '';
    }
  };

  const handleCardClick = (produk: Produk) => {
    router.push({
      pathname: `/seller/detail/${produk.id}`, // API: navigasi ke halaman detail
      query: { status: produk.status }, // API: Kirim status untuk menampilkan status yang sama di halaman detail
    });
  };

  return (
    <div className="min-h-screen bg-white text-indigo-950 font-poppins px-6 pt-20">
      {/* Tombol kembali */}
      <button onClick={() => router.back()} className="flex items-center mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Daftar Jualan
      </button>

      {/* Daftar Produk */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {produkList.map((produk) => (
          <div
            key={produk.id}
            onClick={() => handleCardClick(produk)}
            className="border rounded-lg p-2 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-shadow hover:shadow-md"
          >
            {/* Gambar Produk */}
            <div className="w-full h-32 bg-white border border-dashed flex items-center justify-center text-sm text-gray-400 mb-2">
              {/* API: Tampilkan gambar jika tersedia */}
              {produk.gambar ? (
                <img src={produk.gambar} alt={`Gambar ${produk.nama}`} className="w-full h-full object-cover rounded-md" />
              ) : (
                'Gambar Produk'
              )}
            </div>

            {/* Harga */}
            <p className="font-semibold text-sm mb-1">Rp{produk.harga.toLocaleString()}</p>

            {/* Nama dan Kategori */}
            <p className="text-sm">{produk.nama}</p> {/* API: nama */}
            <p className="text-xs text-gray-600 mb-1">{produk.kategori}</p> {/* API: kategori */}

            {/* Status */}
            <p className="text-xs font-medium text-indigo-700">
              {getStatusText(produk.status)} {/* API: status */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}