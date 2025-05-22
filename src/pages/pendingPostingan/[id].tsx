import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Check, X, Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/axios";

interface Postingan {
  id: number;
  title: string;
  category: string;
  price: string;
  status: "pending" | "approved" | "rejected";
  description: string;
  images?: string[];
  created_at: string;
  seller_info?: {
    username: string;
    avatar?: string;
  };
}

export default function PendingPostinganDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Postingan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPendingPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/post/pending/${id}`);
        setPost(response.data.data);
      } catch (err) {
        setError("Gagal memuat detail postingan");
        console.error("Error fetching pending post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPost();
  }, [id]);

  const handleBack = () => {
    router.push("/menungguPersetujuanPostingan");
  };

  const handleApprove = async () => {
    if (!post) return;
    
    setIsProcessing(true);
    try {
      await api.patch(`/posts/${post.id}/approve`);
      setPost({ ...post, status: "approved" });
    } catch (err) {
      console.error("Error approving post:", err);
      alert("Gagal menyetujui postingan");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!post) return;
    
    setIsProcessing(true);
    try {
      await api.patch(`/posts/${post.id}/reject`);
      setPost({ ...post, status: "rejected" });
    } catch (err) {
      console.error("Error rejecting post:", err);
      alert("Gagal menolak postingan");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={handleBack}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!post) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Postingan tidak ditemukan</p>
            <button
              onClick={handleBack}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-indigo-950" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-indigo-950">
              Detail Postingan Pending
            </h1>
          </div>
          
          <button
            onClick={handleBack}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Kembali ke Daftar
          </button>
        </div>

        {/* Detail Postingan */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Status Bar */}
          <div className={`px-6 py-3 ${
            post.status === 'pending' 
              ? 'bg-yellow-50 border-l-4 border-yellow-400' 
              : post.status === 'approved' 
              ? 'bg-green-50 border-l-4 border-green-400' 
              : 'bg-red-50 border-l-4 border-red-400'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                post.status === 'pending' 
                  ? 'text-yellow-800' 
                  : post.status === 'approved' 
                  ? 'text-green-800' 
                  : 'text-red-800'
              }`}>
                {post.status === 'pending' 
                  ? 'Menunggu Persetujuan' 
                  : post.status === 'approved' 
                  ? 'Disetujui' 
                  : 'Ditolak'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Seller Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                {post.seller_info?.avatar ? (
                  <img 
                    src={post.seller_info.avatar} 
                    alt="Avatar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <ImageIcon size={24} className="text-indigo-600" />
                )}
              </div>
              <div>
                <h2 className="font-semibold text-indigo-950">
                  {post.seller_info?.username || 'Unknown Seller'}
                </h2>
                <p className="text-sm text-gray-500">
                  Kategori: {post.category}
                </p>
              </div>
            </div>

            {/* Post Details */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-indigo-950 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-4">{post.description}</p>
              
              {/* Images */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {post.images?.length ? (
                  post.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative"
                    >
                      <img
                        src={img}
                        alt={`Produk ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-indigo-600">
                  {post.price}
                </span>
                
                {post.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleReject}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <X size={16} />
                      )}
                      Tolak
                    </button>
                    <button
                      onClick={handleApprove}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <Check size={16} />
                      )}
                      Setujui
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}