import { LayoutPanelTop, ThumbsUp, User, FileClock, Repeat, Clock, ListPlus } from "lucide-react";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const dummyPosts = [
  { id: 1, sellerName: "Akun Sultan ML", category: "Mobile Legends", description: "Akun sultan full skin epic, legend, dan koleksi langka lainnya!", images: ["img1", "img2", "img3"] },
  { id: 2, sellerName: "PUBG Murah", category: "PUBG", description: "Level tinggi, RP max, skin senjata lengkap.", images: ["img1", "img2", "img3"] },
  { id: 3, sellerName: "Growtopia Rare Seller", category: "Growtopia", description: "World lock banyak, item rare langka, cocok buat kolektor.", images: ["img1", "img2", "img3"] },
  { id: 4, sellerName: "One Piece Seller", category: "One Piece", description: "Akun event lengkap dengan karakter SSR.", images: ["img1", "img2", "img3"] },
  { id: 5, sellerName: "Free Fire", category: "Free Fire", description: "Bundle rare dan elite pass full!", images: ["img1", "img2", "img3"] },
];

const DashboardViews = () => {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");
  

  useEffect(() => {
    // Ganti ini sesuai cara kamu ambil role user
    const userRole = localStorage.getItem("userRole"); // contoh: "admin", "midman", "buyer"
    setRole(userRole || "admin");
  }, []);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  const filteredPosts = selectedCategory
    ? dummyPosts.filter(post => post.category === selectedCategory)
    : dummyPosts;

  const renderSidebar = () => {
    if (role === "admin") {
      return (
        <>
          <SidebarItem icon={<User size={20} />} text="List User" href="/listUser" />
          <SidebarItem icon={<FileClock size={20} />} text="Postingan Menunggu Persetujuan" href="/menungguPersetujuanPostingan" />
          <SidebarItem icon={<Repeat size={20} />} text="Pengajuan Menjadi Seller" href="/pengajuanMenjadiSeller" />
          <SidebarItem icon={<ListPlus size={20} />} text="Tambah Kategori" href="" />
        </>
      );
    }

    if (role === "midman") {
      return (
        <>
          <SidebarItem icon={<User size={20} />} text="List User" href="/listUser"/>
          <SidebarItem icon={<Clock size={20} />} text="Semua Transaksi" href="/semuaTransaksi" />
        </>
      );
    }

    // default: buyer or seller
    return (
      <>
        <h2 className="text-2xl font-bold mb-4 mt-5 text-indigo-950">Kategori</h2>
        {["Mobile Legends", "PUBG", "One Piece", "Free Fire", "Growtopia", "Roblox"].map((game) => (
          <li
            key={game}
            onClick={() => handleCategoryClick(game)}
            className={`flex items-center space-x-2 cursor-pointer mb-2 ${
              selectedCategory === game ? "text-indigo-800 font-semibold" : "text-zinc-900 hover:text-indigo-800"
            }`}
          >
            <LayoutPanelTop className="w-5 h-5" />
            <span>{game}</span>
          </li>
        ))}
      </>
    );
  };

  return (
    <div className="pt-7 flex bg-zinc-900 min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-10rem left-0 w-64 bg-zinc-300 shadow-md p-4 mt-7 h-screen overflow-y-auto font-poppins">
        <ul>{renderSidebar()}</ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto ml-64">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts.includes(post.id);
          return (
            <div key={post.id} className="bg-zinc-300 rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full" />
                <div>
                  <h3 className="text-lg font-poppins text-zinc-950 font-semibold">{post.sellerName}</h3>
                  <p className="text-sm text-zinc-950">{post.category}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-950 mb-4">{post.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {post.images.map((_, index) => (
                  <div key={index} className="bg-white h-32 rounded-md" />
                ))}
              </div>

              <div className="flex space-x-6 text-sm text-zinc-950">
                <motion.button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center font-poppins space-x-1 ${
                    isLiked ? "text-blue-600" : "text-zinc-950"
                  } hover:opacity-80`}
                  whileTap={{ scale: 1.2 }}
                  animate={{ scale: isLiked ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>Like</span>
                </motion.button>

                <button
                  onClick={() => router.push("/detailPostingan")}
                  className="flex items-center text-zinc-950 font-poppins space-x-1 hover:text-indigo-800 cursor-pointer"
                >
                  <i className="fas fa-info-circle"></i>
                  <span>Info Lengkap</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) => (
  <li>
    <a
      href={href}
      className="flex items-center gap-2 text-zinc-900 hover:text-indigo-800 font-semibold mb-4"
    >
      {icon}
      {text}
    </a>
  </li>
);

export default DashboardViews;
