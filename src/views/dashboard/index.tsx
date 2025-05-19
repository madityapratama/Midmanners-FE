import { ThumbsUp, Info } from "lucide-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Post = {
  id: number;
  seller: {
    name: string;
  };
  categories: string[];
  caption: string;
  images: string[];
};

const DashboardViews = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.data;
        setPosts(result.data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const openImageLightbox = (post: Post, index: number) => {
    setCurrentPost(post);
    setCurrentImageIndex(index);
    setOpenLightbox(true);
  };

  return (
    <div className="pt-16 flex bg-zinc-800 min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 bg-zinc-300 shadow-lg p-4 h-screen overflow-y-auto font-poppins">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto ml-64">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          posts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <div
                key={post.id}
                className="bg-zinc-700 rounded-xl shadow-xl p-6 transition-all hover:shadow-2xl hover:bg-zinc-600"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-zinc-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {post.seller.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-poppins text-white font-semibold">
                      {post.seller.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {post.categories.map((category, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-zinc-600 text-zinc-200 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-zinc-200 mb-6 leading-relaxed">
                  {post.caption}
                </p>

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
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex space-x-6 text-sm border-t border-zinc-600 pt-4">
                  <motion.button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center font-poppins space-x-2 ${
                      isLiked ? "text-blue-400" : "text-zinc-300"
                    } hover:text-white transition-colors`}
                    whileTap={{ scale: 1.2 }}
                    animate={{ scale: isLiked ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{isLiked ? "Liked" : "Like"}</span>
                  </motion.button>

                  <motion.button
                    onClick={() => router.push(`/detailPostingan/${post.id}`)}
                    className="flex items-center text-zinc-300 font-poppins space-x-2 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Info className="w-5 h-5" />
                    <span>Info Lengkap</span>
                  </motion.button>
                </div>
              </div>
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
          on={{
            view: ({ index }) => setCurrentImageIndex(index),
          }}
          controller={{
            closeOnBackdropClick: true,
          }}
          animation={{
            fade: 300,
            swipe: 200,
          }}
          carousel={{
            finite: currentPost.images.length <= 1,
          }}
          noScroll={{ disabled: true }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          }}
        />
      )}
    </div>
  );
};

export default DashboardViews;