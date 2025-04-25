import { LayoutPanelTop } from "lucide-react";
import { useRouter } from 'next/router';

// Dummy data
const dummyPosts = [
    {
        id: 1,
        sellerName: "Akun Sultan ML",
        category: "Mobile Legends",
        description: "Akun sultan full skin epic, legend, dan koleksi langka lainnya!",
        images: ["img1", "img2", "img3"],
    },
    {
        id: 2,
        sellerName: "PUBG Murah",
        category: "PUBG",
        description: "Level tinggi, RP max, skin senjata lengkap.",
        images: ["img1", "img2", "img3"],
    },
    {
        id: 3,
        sellerName: "Growtopia Rare Seller",
        category: "Growtopia",
        description: "World lock banyak, item rare langka, cocok buat kolektor.",
        images: ["img1", "img2", "img3"],
    },
    {
        id: 4,
        sellerName: "One Piece Seller",
        category: "One Piece",
        description: "Akun event lengkap dengan karakter SSR.",
        images: ["img1", "img2", "img3"],
    },
    {
        id: 5,
        sellerName: "Free Fire",
        category: "Free Fire",
        description: "Bundle rare dan elite pass full!",
        images: ["img1", "img2", "img3"],
    },
];

const DashboardViews = () => {
    const router = useRouter(); // <-- Tambahkan ini
    return (
        <div className="pt-20 flex bg-gray-100 min-h-screen">
            {/* Sidebar - Fixed */}
            <div className="fixed top-15 left-0 w-64 bg-white shadow-md p-4 h-[calc(100vh-5rem)] overflow-y-auto">
                <h2 className="text-lg text-black font-semibold mb-4">Kategori</h2>
                <ul className="space-y-4">
                    {["Mobile Legends", "PUBG", "One Piece", "Free Fire", "Growtopia", "Roblox"].map((game) => (
                        <li
                            key={game}
                            className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer"
                        >
                            <LayoutPanelTop className="w-5 h-5" />
                            <span>{game}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto ml-64">
                {dummyPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-gray-300 rounded-full" />
                            <div>
                                <h3 className="text-lg text-black font-semibold">{post.sellerName}</h3>
                                <p className="text-sm text-gray-500">Kategori {post.category}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{post.description}</p>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {post.images.map((_, index) => (
                                <div key={index} className="bg-gray-300 h-32 rounded-md" />
                            ))}
                        </div>

                        <div className="flex space-x-6 text-sm text-gray-600">
                            <button className="flex items-center space-x-1 hover:text-black">
                                <i className="fas fa-thumbs-up"></i>
                                <span>Like</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-black">
                                <i className="fas fa-comment"></i>
                                <span>Komentar</span>
                            </button>
                            <button 
                            onClick={() => router.push('/detail_postingan')}
                            className="flex items-center space-x-1 hover:text-black">
                                <i className="fas fa-info-circle"></i>
                                <span>Info Lengkap</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardViews;
