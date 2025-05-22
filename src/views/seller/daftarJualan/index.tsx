import { useEffect, useState } from 'react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import api from "@/lib/axios"

interface Post {
  id: number;
  title: string;
  price: number;
  images: string[];
  categories: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'sold';
  isAvailable: boolean;
}

export default function DaftarJualanViews() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get( `${process.env.NEXT_PUBLIC_API_URL}/seller/posts`);
        setPosts(response.data.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Gagal memuat daftar produk. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Persetujuan';
      case 'accepted':
        return 'Disetujui';
      case 'rejected':
        return 'Ditolak';
      case 'sold':
        return 'Terjual';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'accepted':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'sold':
        return 'text-purple-600';
      default:
        return 'text-indigo-700';
    }
  };

  const handleCardClick = (post: Post) => {
    router.push({
      pathname: `/seller/detail/${post.id}`,
      query: { status: post.status },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-indigo-950 font-poppins px-6 pt-20">
        <button onClick={() => router.back()} className="flex items-center mb-6">
          <ArrowLeft className="mr-2" size={20} />
          Daftar Jualan
        </button>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border rounded-lg p-2 bg-gray-100 animate-pulse">
              <div className="w-full h-32 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-indigo-950 font-poppins px-6 pt-20">
        <button onClick={() => router.back()} className="flex items-center mb-6">
          <ArrowLeft className="mr-2" size={20} />
          Daftar Jualan
        </button>
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-indigo-950 font-poppins px-6 pt-20 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => router.back()} className="flex items-center">
          <ArrowLeft className="mr-2" size={20} />
          <span className="font-semibold">Daftar Jualan</span>
        </button>
        <span className="text-sm text-gray-500">
          {posts.length} {posts.length === 1 ? 'produk' : 'produk'}
        </span>
      </div>

      {/* Daftar Produk */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">Belum ada produk yang dijual</p>
          <button
            onClick={() => router.push('/seller/create-post')}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Tambah Produk
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handleCardClick(post)}
              className="border rounded-lg p-3 bg-white cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Image Gallery */}
              <div className="w-full h-40 bg-gray-100 rounded-md mb-3 overflow-hidden relative">
                {post.images.length > 0 ? (
                  <>
                    <img 
                      src={`${process.env.NEXT_PUBLIC_IMG_URL || ''}/${post.images[0]}`} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    {post.images.length > 1 && (
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        +{post.images.length - 1}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>

              {/* Price */}
              <p className="font-bold text-sm mb-1">
                Rp{post.price.toLocaleString('id-ID')}
              </p>

              {/* Title */}
              <p className="text-sm line-clamp-2 mb-1" title={post.title}>
                {post.title}
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-1 mb-2">
                {post.categories.slice(0, 2).map((category, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full"
                  >
                    {category}
                  </span>
                ))}
                {post.categories.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{post.categories.length - 2}
                  </span>
                )}
              </div>

              {/* Status and Availability */}
              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium ${getStatusColor(post.status)}`}>
                  {getStatusText(post.status)}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  post.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {post.isAvailable ? 'Tersedia' : 'Habis'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}