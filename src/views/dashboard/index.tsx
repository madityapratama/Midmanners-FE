import { ThumbsUp, Info, MessageCircle,Search } from "lucide-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useCategory } from "@/context/CategoryContext";
import {useSearch} from "@/context/SearchContext";

type Post = {
  id: number;
  seller: {
    name: string;
    avatar?: string;
  };
  categories: string[];
  caption: string;
  images: string[];
  like_count: number;
  comment_count: number;
  created_at: string;
};

const DashboardViews = () => {
  const router = useRouter();
  const {selectedCategory} = useCategory();
  const {search} = useSearch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts`;

      let url = baseUrl;

      if(selectedCategory){
        url = `${baseUrl}/category/${selectedCategory}`;
      };

      if(search){
        url += selectedCategory ? `?search=${search}` : `?search=${search}`;
      }
      console.log(url);
      setLoading(true);
      try {
        const response = await api.get(url);
        setPosts(response.data.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory,search]);

  // const toggleLike = async (postId: number) => {
  //   try {
  //     await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/like`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setLikedPosts((prev) =>
  //       prev.includes(postId)
  //         ? prev.filter((id) => id !== postId)
  //         : [...prev, postId]
  //     );
  //     setPosts(posts.map(post => 
  //       post.id === postId ? { 
  //         ...post, 
  //         like_count: likedPosts.includes(postId) ? post.like_count - 1 : post.like_count + 1 
  //       } : post
  //     ));
  //   } catch (error) {
  //     console.error("Failed to toggle like:", error);
  //   }
  // };

  const openImageLightbox = (post: Post, index: number) => {
    setCurrentPost(post);
    setCurrentImageIndex(index);
    setOpenLightbox(true);
  };

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };


  return (
    <div className="flex min-h-screen pt-16 bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-75 h-full bg-indigo-900 shadow-lg p-4 overflow-y-auto">
        <Sidebar />
      </div>
    

      {/* Main Content */}
      <div className="flex-1 ml-75 p-6 space-y-6 overflow-y-auto">
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : posts.length === 0 ?(
            <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
      Post tidak tersedia
    </div>
        ) : (
          
          posts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center space-x-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
                    {post.seller.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post.seller.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {post.categories.map((category, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <span className="text-xl font-bold text-blue-600">
                {formatPrice(post.price)}
              </span>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {post.caption}
                  </p>
                  

                  {/* Images Grid */}
                  {post.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {post.images.map((imgUrl, index) => (
                        <div
                          key={index}
                          onClick={() => openImageLightbox(post, index)}
                          className="relative h-48 w-full rounded-lg overflow-hidden group cursor-zoom-in"
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}${imgUrl}`}
                            alt={`Post Image ${index + 1}`}
                            fill
                            className="object-cover group-hover:opacity-90 transition-opacity"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Post Footer */}
                <div className="px-4 py-3 border-t border-gray-100 flex justify-between">
                  <div className="flex space-x-4">
                    <motion.button
                      // onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-2 ${
                        isLiked ? "text-indigo-600" : "text-gray-500"
                      } hover:text-indigo-600 transition-colors`}
                      // whileTap={{ scale: 1.1 }}
                    >
                      <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-indigo-600' : ''}`} />
                      <span>{post.like_count} Likes</span>
                    </motion.button>

                    <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comment_count} Comments</span>
                    </button>
                  </div>

                  <div className="flex space-x-4">
                    <motion.button
                      onClick={() => router.push(`/detailPostingan/${post.id}`)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Info className="w-5 h-5" />
                      <span>Details</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Lightbox */}
      {openLightbox && currentPost && (
        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          index={currentImageIndex}
          slides={currentPost.images.map((img) => ({
            src: `${process.env.NEXT_PUBLIC_IMG_URL}${img}`,
          }))}
          plugins={[Zoom]}
          on={{ view: ({ index }) => setCurrentImageIndex(index) }}
          controller={{ closeOnBackdropClick: true }}
          animation={{ fade: 300 }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          }}
        />
      )}
    </div>
  );
};

export default DashboardViews;