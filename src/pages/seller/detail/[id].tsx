// pages/seller/postingan/[id].tsx

import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Produk {
  id: number;
  nama: string;
  harga: number;
  kategori: string;
  gambar: string;
  deskripsi?: string;
  status: "menunggu" | "disetujui" | "terjual";
}

interface Comment {
  id: number;
  name: string;
  avatar: string;
  content: string;
}

export default function DetailPostinganSeller() {
  const router = useRouter();
  const { id } = router.query;

  const [produk, setProduk] = useState<Produk | null>(null);

  // State komentar dummy, nanti diganti dengan fetch API komentar produk tertentu
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Andi",
      avatar: "/avatar1.png",
      content: "Barangnya bagus banget! Rekomended seller!",
    },
    {
      id: 2,
      name: "Budi",
      avatar: "/avatar2.png",
      content: "Sudah diterima, sesuai dengan deskripsi.",
    },
  ]);

  // State komentar baru yang diinput user
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!id) return;

    // Dummy data sementara, nanti diganti fetch API produk berdasarkan id
    const dummyData: Produk[] = [
      {
        id: 1,
        nama: "Nama Produk Jualan",
        harga: 150000,
        kategori: "Mobile Legends",
        gambar: "",
        deskripsi: "Akun ML Sultan full skin epic dan legend.",
        status: "menunggu", // Produk yang menunggu approval
      },
      {
        id: 2,
        nama: "Nama Produk Jualan",
        harga: 150000,
        kategori: "Free Fire",
        gambar: "",
        deskripsi: "Akun FF dengan bundle lengkap.",
        status: "disetujui", // Produk sudah disetujui
      },
      {
        id: 3,
        nama: "Nama Produk Jualan",
        harga: 150000,
        kategori: "Valorant",
        gambar: "",
        deskripsi: "Akun Valorant dengan banyak skin premium.",
        status: "terjual", // Produk sudah terjual
      },
    ];

    // Cari produk berdasarkan id dari dummyData
    const found = dummyData.find((p) => p.id === Number(id));
    setProduk(found || null);
  }, [id]);

  // Fungsi menambahkan komentar baru
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newEntry: Comment = {
      id: comments.length + 1, // ID dummy, di API nanti pakai id dari backend
      name: "User Baru", // Nama user dummy, nanti dari user login
      avatar: "/avatar-placeholder.png", // Avatar user dummy
      content: newComment,
    };

    setComments([...comments, newEntry]); // Update komentar state
    setNewComment(""); // Reset textarea
  };

  // Fungsi mengubah status produk ke teks deskriptif
  const getStatusText = (status: Produk["status"]) => {
    switch (status) {
      case "menunggu":
        return "Menunggu Disetujui";
      case "disetujui":
        return "Sudah Disetujui";
      case "terjual":
        return "Sudah Terjual";
      default:
        return "";
    }
  };

  if (!produk) {
    // Loading state saat produk belum di-fetch
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 font-poppins">
        Memuat data produk...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="pt-20 px-6 bg-gray-300 min-h-screen font-poppins">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          {/* Tombol Kembali */}
          <div>
            <button
              onClick={() => router.back()}
              className="mb-2 text-sm text-black hover:underline"
            >
              ← Kembali
            </button>
          </div>

          {/* Header Produk */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
                {/* Avatar placeholder */}
                <img
                  src="/placeholder.png"
                  alt="avatar"
                  className="w-12 h-12 object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg text-black font-semibold">
                  {produk.nama}
                </h2>
                <p className="text-sm text-gray-600">{produk.kategori}</p>
                <p className="text-sm text-indigo-700 font-semibold">
                  Status: {getStatusText(produk.status)}
                </p>
              </div>
            </div>
            {/* Tombol Chat Penjual dihapus karena ini halaman seller */}
          </div>

          {/* Deskripsi */}
          <p className="text-sm text-gray-700">
            {produk.deskripsi || "Tidak ada deskripsi."}
          </p>

          {/* Gambar Produk */}
          <div className="flex space-x-4 overflow-x-auto">
            {produk.gambar ? (
              <div className="w-32 h-28 bg-gray-400 rounded flex items-center justify-center">
                <img
                  src={produk.gambar}
                  alt="gambar produk"
                  className="w-32 h-28 object-cover rounded"
                />
              </div>
            ) : (
              [1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="w-32 h-28 bg-gray-400 rounded flex items-center justify-center"
                >
                  <img
                    src="/placeholder.png"
                    alt="gambar"
                    className="w-24 h-20"
                  />
                </div>
              ))
            )}
          </div>

          {/* Tombol aksi like dan beli dihapus karena seller tidak bisa beli dan like produk sendiri */}
        </div>

        {/* Tampilkan komentar hanya jika status produk bukan 'menunggu' */}
        {produk.status !== "menunggu" && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-black">Komentar</h3>

            {/* Daftar komentar */}
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-10 h-10 rounded-full bg-gray-300"
                />
                <div>
                  <p className="text-sm font-semibold text-black">
                    {comment.name}
                  </p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}

            {/* Input komentar baru */}
            <div className="pt-4 border-t border-gray-300">
              <textarea
                rows={2}
                className="w-full border text-black border-gray-300 rounded p-2 text-sm"
                placeholder="Tulis komentar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded"
                >
                  Kirim Komentar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
