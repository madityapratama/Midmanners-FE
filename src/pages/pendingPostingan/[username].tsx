import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

// Tipe data untuk satu postingan
interface Postingan {
  id: number;
  title: string;
  category: string;
  price: string;
  status: string;
  description?: string;
}

export default function PendingPostinganPage() {
  const router = useRouter();
  const { username } = router.query;

  const [data, setData] = useState<Postingan[]>([]);

  useEffect(() => {
    if (!username) return;

    // ============ PENGAMBILAN DATA DUMMY ============ //
    // Nanti bagian ini bisa diganti dengan fetch/axios dari API, contohnya:
    // axios.get(`/api/postingan-pending?username=${username}`).then(res => setData(res.data))

    const dummyData: Postingan[] = [
      {
        id: 1,
        title: "Judul Postingan",
        category: "Game",
        price: "Rp. 15.000",
        status: "Menunggu Persetujuan",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.",
      },
    ];

    setData(dummyData);
  }, [username]);

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleBack = () => {
    router.push("/menungguPersetujuanPostingan");
  };

  // Menampilkan nama penjual berdasarkan username dari URL
  const sellerName = typeof username === "string" ? username : "Nama Penjual";

  return (
    <div className="min-h-screen bg-white px-6 pt-5 pb-10 font-poppins">
      {/* Header dengan tombol kembali dan judul halaman */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="text-gray-700 hover:text-black">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-indigo-950">
          Postingan Pending: {sellerName}
        </h1>
      </div>

      {/* Tombol Kembali tambahan */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="bg-indigo-950 hover:bg-indigo-800 text-white font-medium px-4 py-2 rounded-lg transition duration-300"
        >
          Kembali
        </button>
      </div>

      {/* Daftar Card Postingan */}
      <div className="space-y-6">
        {data.map((item) => (
          <div key={item.id} className="bg-zinc-400 rounded-xl p-4 relative">
            {/* Status di pojok kanan atas */}
            <div className="absolute top-4 right-4 bg-indigo-950 text-sm font-semibold text-white px-3 py-1 rounded-lg shadow-sm">
              {item.status}
            </div>

            {/* Header seller: avatar dan nama penjual */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                <ImageIcon size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-indigo-950">{sellerName}</h2>
                <p className="text-sm text-indigo-950">Kategori {item.category}</p>
              </div>
            </div>

            {/* Deskripsi produk */}
            <p className="text-sm text-indigo-950 mb-4">{item.description}</p>

            {/* Gambar produk placeholder */}
            <div className="flex gap-4 mb-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-24 bg-white rounded-md flex items-center justify-center border border-black"
                >
                  <ImageIcon size={32} />
                </div>
              ))}
            </div>

            {/* Harga produk */}
            <div className="text-right text-lg font-semibold text-indigo-950">
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
