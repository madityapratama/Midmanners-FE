import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import api from "@/lib/axios";

interface PostDetail {
  id: number;
  title: string;
  caption: string;
  price: number;
  images: string[];
  status_post: "pending" | "accepted" | "rejected" | "sold";
  isAvailable: boolean;
  seller: {
    id: number;
    name: string;
  };
  categories: string[];
  created_at: string;
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

  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchPostDetail = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/detail`);
        setPost(response.data.data);
        
        // Dummy comments - replace with actual API call if available
        setComments([
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
      } catch (err) {
        console.error("Error fetching post detail:", err);
        setError("Gagal memuat detail produk. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newEntry: Comment = {
      id: comments.length + 1,
      name: "User Baru",
      avatar: "/avatar-placeholder.png",
      content: newComment,
    };

    setComments([...comments, newEntry]);
    setNewComment("");
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu Persetujuan";
      case "accepted":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      case "sold":
        return "Terjual";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "sold":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center text-gray-600 font-poppins">
          Memuat data produk...
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 font-poppins p-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Coba Lagi
          </button>
        </div>
      </ProtectedRoute>
    );
  }

  if (!post) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center text-gray-600 font-poppins">
          Produk tidak ditemukan
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="pt-20 px-4 md:px-6 bg-gray-50 min-h-screen font-poppins pb-10">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center mb-4 text-sm text-gray-600 hover:text-indigo-600"
          >
            <ArrowLeft className="mr-1" size={16} />
            Kembali
          </button>

          {/* Main product card */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Product header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{post.title}</h1>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {post.categories.map((category, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(post.status_post)}`}>
                  {getStatusText(post.status_post)}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full mt-2 ${
                  post.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {post.isAvailable ? 'Tersedia' : 'Habis'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-indigo-700">
                Rp{post.price.toLocaleString('id-ID')}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Deskripsi</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {post.caption || "Tidak ada deskripsi."}
              </p>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Gambar Produk</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {post.images.length > 0 ? (
                  post.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMG_URL || ''}/${image}`}
                        alt={`${post.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
                    <ImageIcon className="text-gray-400 mb-2" size={32} />
                    <p className="text-gray-500 text-sm">Tidak ada gambar</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product info */}
            <div className="flex justify-between gap-4 text-sm">
              <div>
                <p className="text-gray-500">Dibuat pada</p>
                <p className="font-medium text-gray-900">
                  {new Date(post.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Penjual</p>
                <p className="font-medium text-gray-900">{post.seller.name}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}