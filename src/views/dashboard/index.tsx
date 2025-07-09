import { ThumbsUp, Info, MessageCircle, Search } from "lucide-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useCategory } from "@/context/CategoryContext";
import { useSearch } from "@/context/SearchContext";
import InfiniteScroll from "react-infinite-scroll-component";

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
  price: number;
};

const DashboardViews = () => {
  const router = useRouter();
  const { selectedCategory, setSelectedCategory } = useCategory(); // Added setSelectedCategory if it's available in context for resetting
  const { search } = useSearch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // Removed initialLoad as it was causing complexity, simpler state management is preferred.

  // Effect to reset state when category or search changes, and trigger a fetch for page 1
  useEffect(() => {
    // Clear posts, reset page to 1, and ensure hasMore is true for new fetches
    setPosts([]);
    setPage(1);
    setHasMore(true);
    // The fetchPosts effect below will be triggered because `page` changes to 1,
    // or `selectedCategory`/`search` change.
  }, [selectedCategory, search]);

  // Effect to fetch posts when page, selectedCategory, or search changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/posts`; // Default base URL

        // Determine the base URL based on selectedCategory
        if (selectedCategory) {
          url = `${process.env.NEXT_PUBLIC_API_URL}/posts/category/${selectedCategory}`;
        }

        // Add page parameter
        url += `?page=${page}`;

        // Add search parameter if present and no category is selected (based on current backend)
        if (search && !selectedCategory) {
          url += `&search=${search}`;
        }

        const response = await api.get(url);
        const postData = response.data.data?.data || [];
        const nextPageExists = response.data.data?.next_page_url !== null;

        // If it's page 1, replace posts. Otherwise, append.
        setPosts((prev) => (page === 1 ? postData : [...prev, ...postData]));
        setHasMore(nextPageExists);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setHasMore(false); // Stop trying to fetch more if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, selectedCategory, search]); // Dependencies for fetching posts

  // Function to load more posts
  const fetchMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

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
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={<div className="flex justify-center items-center h-10 bg-white">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-indigo-600"></div>
            </div>}
      endMessage={""}
    >
      <div className="flex min-h-screen pt-16 md:pt-16 bg-gray-100">
        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
          {loading && posts.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : posts.length === 0 ? (
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
                  <div className="p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4 border-b border-gray-100">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg sm:text-xl">
                      {post.seller.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                        {post.seller.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                        {post.categories.map((category, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div
                    className="p-3 sm:p-4 cursor-pointer"
                    onClick={() => router.push(`/detailPostingan/${post.id}`)}
                  >
                    <span className="text-lg sm:text-xl font-bold text-blue-600">
                      {formatPrice(post.price)}
                    </span>
                    <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {post.caption}
                    </p>

                    {/* Images Grid */}
                    {post.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                        {post.images.map((imgUrl, index) => (
                          <div
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              openImageLightbox(post, index);
                            }}
                            className="relative h-32 sm:h-48 w-full rounded-lg overflow-hidden group cursor-zoom-in"
                          >
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMG_URL}${imgUrl}`}
                              alt={`Post Image ${index + 1}`}
                              fill
                              priority
                              className="object-cover group-hover:opacity-90 transition-opacity"
                              sizes="(max-width: 640px) 50vw, 33vw"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Footer */}
                  <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100 flex justify-between gap-2 sm:gap-0">
                    <div className="flex space-x-3 sm:space-x-4">
                      <motion.button
                        className={`flex items-center space-x-1 sm:space-x-2 ${
                          isLiked ? "text-indigo-600" : "text-gray-500"
                        } hover:text-indigo-600 transition-colors`}
                      >
                        <ThumbsUp
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            isLiked ? "fill-indigo-600" : ""
                          }`}
                        />
                        <span className="text-xs sm:text-sm">
                          {post.like_count} Likes
                        </span>
                      </motion.button>

                      <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">
                          {post.comment_count} Comments
                        </span>
                      </button>
                    </div>

                    <div className="flex space-x-3 sm:space-x-4">
                      <motion.button
                        onClick={() =>
                          router.push(`/detailPostingan/${post.id}`)
                        }
                        className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">Details</span>
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
    </InfiniteScroll>
  );
};

export default DashboardViews;