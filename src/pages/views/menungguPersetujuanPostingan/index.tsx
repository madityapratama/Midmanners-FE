/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, FileText } from "lucide-react";

interface Post {
  id: number;
  seller: string;
  title: string;
  category: string;
  price: string;
}

export default function menungguPersetujuanPostinganViews () {
    const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      seller: "Gattuso",
      title: "Jual Akun ML",
      category: "Mobile Legends",
      price: "Rp200.300",
    },
    {
      id: 2,
      seller: "Gattuso",
      title: "Jual Akun ML",
      category: "Mobile Legends",
      price: "Rp150.000",
    },
    {
      id: 3,
      seller: "Gattuso",
      title: "Jual Akun ML",
      category: "Mobile Legends",
      price: "Rp300.00",
    },
  ]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleApprove = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
    // TODO: Panggil API Laravel untuk menyetujui postingan
  };

  const handleReject = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
    // TODO: Panggil API Laravel untuk menolak postingan
  };

  const goToSellerPending = (username: string) => {
    router.push(`/pendingPostingan/${username}`);
  };

    return (
         <div className="min-h-screen bg-white px-6 pt-20 pb-10">
      {/* Tombol Kembali */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="text-gray-700 hover:text-black">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-indigo-950 font-poppins">Postingan Menunggu Persetujuan</h1>
      </div>

      {/* Table */}
      <div className="bg-gray-300 rounded-lg overflow-x-auto">
        <table className="min-w-full font-poppins text-sm text-indigo-950">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Username Penjual</th>
              <th className="px-4 py-2">Judul Postingan</th>
              <th className="px-4 py-2">Kategori</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{post.seller}</td>
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2">{post.category}</td>
                <td className="px-4 py-2">{post.price}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleApprove(post.id)}
                    className="bg-indigo-950 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Setuju
                  </button>
                  <button
                    onClick={() => handleReject(post.id)}
                    className="bg-indigo-950 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Tolak
                  </button>
                </td>
                <td className="px-4 py-2">
                  <FileText
                    className="text-black cursor-pointer"
                    onClick={() => goToSellerPending(post.seller)}
                  />
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-600">
                  Tidak ada postingan menunggu persetujuan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
}