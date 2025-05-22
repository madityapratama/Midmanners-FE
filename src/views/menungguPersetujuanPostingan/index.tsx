import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, FileText, Check, X, Search } from "lucide-react";

interface Post {
  id: number;
  seller: string;
  title: string;
  category: string;
  price: string;
  status?: "pending" | "approved" | "rejected";
  date?: string;
}

export default function MenungguPersetujuanPostinganViews() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      seller: "Gattuso",
      title: "Jual Akun MLBB Level 30",
      category: "Mobile Legends",
      price: "Rp200.300",
      status: "pending",
      date: "2023-05-20",
    },
    {
      id: 2,
      seller: "PlayerPro",
      title: "Akun Epic MLBB Skin Legend",
      category: "Mobile Legends",
      price: "Rp150.000",
      status: "pending",
      date: "2023-05-21",
    },
    {
      id: 3,
      seller: "GameMaster",
      title: "Jual Akun MLBB dengan 10 Hero Mythic",
      category: "Mobile Legends",
      price: "Rp300.000",
      status: "pending",
      date: "2023-05-22",
    },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleApprove = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: "approved" } : post
    ));
    // TODO: Panggil API Laravel untuk menyetujui postingan
  };

  const handleReject = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: "rejected" } : post
    ));
    // TODO: Panggil API Laravel untuk menolak postingan
  };

  const goToSellerPending = (username: string) => {
    router.push(`/pendingPostingan/${username}`);
  };

  const filteredPosts = posts.filter(post =>
    post.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col mt-12 md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-indigo-950" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-indigo-950 font-poppins">
            Postingan Menunggu Persetujuan
          </h1>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full font-poppins text-sm">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-950 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-950 uppercase tracking-wider">
                  Penjual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-950 uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-950 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-950 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-950 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-950 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-950 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post, index) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td 
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    onClick={() => goToSellerPending(post.seller)}
                  >
                    {post.seller}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {post.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : post.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {post.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
                      title="Setujui"
                    >
                      <Check size={16} />
                      <span className="hidden md:inline">Setujui</span>
                    </button>
                    <button
                      onClick={() => handleReject(post.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
                      title="Tolak"
                    >
                      <X size={16} />
                      <span className="hidden md:inline">Tolak</span>
                    </button>
                    <FileText
                      size={18}
                      className="text-indigo-600 hover:text-indigo-800 cursor-pointer ml-2"
                      onClick={() => goToSellerPending(post.seller)}
                      title="Detail"
                    />
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-400">
                        {searchTerm ? "Tidak ada hasil pencarian" : "Tidak ada postingan menunggu persetujuan"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}