import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";
import { ThumbsUp, ArrowLeft, Send, Loader, Check, Trash2 } from "lucide-react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useAuth } from "@/context/AuthContext";
import { CommentItem } from "@/components/CommentItem";
import { formatDate } from "@/lib/date";
import { handleBuy } from "@/lib/handleBuy";
import DeleteButton from "@/components/DeleteButton";
import toast, { Toaster } from "react-hot-toast";

type PostDetail = {
  id: number;
  title: string;
  caption: string;
  price: number;
  images: string[];
  seller: {
    name: string;
    avatar?: string;
  };
  categories: string[];
  like_count: number;
  comment_count: number;
  created_at: string;
};

type User = {
  id: number;
  name: string;
  avatar?: string;
  profile_image?: string | null;
};

type Comment = {
  id: number;
  user: User;
  comment: string;
  created_at: string;
  replies?: Comment[];
  parent_comment_id?: number | null;
};

export default function DetailPostinganViews() {
  const router = useRouter();
  const { id } = router.query;
  const { profile } = useAuth();
  console.log(profile);

  // STATE: Post detail
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // STATE: Comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<{
    id: number | null;
    name: string;
  }>({ id: null, name: "" });
  const [replyText, setReplyText] = useState("");

  // STATE: Like
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // STATE: Lightbox
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isChatLoading, setIsChatLoading] = useState(false);

  const currentUser = profile;
  console.log(currentUser);
  console.log("wia");

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  console.log(post);

  const fetchPostDetail = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/detail`
      );
      setLiked(response.data.data.liked_by_user);
      setPost(response.data.data);
      setLikeCount(response.data.data.like_count);

      setLoading(false);
    } catch (err) {
      setError("Gagal memuat detail postingan");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteSuccess = (deletedPostId: string | number) => {
    setPost(null);
  };

  const fetchComments = async () => {
    try {
      // const token = getAuthToken();
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comment`
      );
      setComments(response.data.data);
    } catch (err) {
      console.error("Gagal memuat komentar", err);
    }
  };
  // Fetch post detail
  useEffect(() => {
    if (!id) return;

    fetchPostDetail();
    fetchComments();
  }, [id]);

  // Handle like
  const handleLike = async () => {
    const prevLiked = liked;
    const prevLikeCount = likeCount;

    const newLiked = !liked;
    const newLikeCount = newLiked ? likeCount + 1 : likeCount - 1;

    setLiked(newLiked);
    setLikeCount(newLikeCount);

    try {
      // const token = getAuthToken();
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like`,
        {}
      );

      // setLiked(response.data.liked);
      // setLikeCount(response.data.likes);
      fetchPostDetail();
      fetchComments();
    } catch (err) {
      console.error("Gagal menyukai postingan", err);
      setLiked(prevLiked);
      setLikeCount(prevLikeCount);
    }
  };

  // Handle reply
  const addReplyRecursive = (
    comments: Comment[],
    parentId: number,
    newReply: Comment
  ): Comment[] => {
    return comments.map((comment) => {
      // Jika ini komentar yang ingin dibalas
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }

      // Jika komentar memiliki replies, cari di dalamnya
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyRecursive(comment.replies, parentId, newReply),
        };
      }

      // Komentar tidak memiliki replies atau bukan yang dicari
      return comment;
    });
  };

  // Handle add comment
  const handleAddComment = async () => {
    const textToSend = replyingTo.id ? replyText : newComment;
    if (!textToSend.trim()) return;

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comment`,
        {
          comment: textToSend,
          parent_comment_id: replyingTo.id || null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newCommentData = response.data.data;

      if (replyingTo.id) {
        // Tambahkan reply ke komentar yang sesuai
        setComments((prev) =>
          addReplyRecursive(prev, replyingTo.id, newCommentData)
        );
        setReplyText("");
      } else {
        // Tambahkan komentar baru
        setComments((prev) => [
          {
            ...newCommentData,
            replies: [],
            user: {
              id: newCommentData.user_id || 0,
              name: newCommentData.name,
              // avatar: null,
            },
          },
          ...prev, // Komentar baru di atas
        ]);
        setNewComment("");
      }

      // Reset state reply
      setReplyingTo({ id: null, name: "" });
      fetchPostDetail();
      fetchComments();
    } catch (err) {
      console.error("Gagal menambahkan komentar", err);
      // Tambahkan notifikasi error ke pengguna jika perlu
    }
  };

  const onBuyClick = async () => {
    setLoading(true);
    try {
      await handleBuy(post.id); // akan redirect
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Terjadi kesalahan saat membeli.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Fungsi rekursif untuk menghapus komentar
      const removeCommentRecursive = (
        comments: Comment[],
        targetId: number
      ): Comment[] => {
        return comments
          .filter((comment) => comment.id !== targetId)
          .map((comment) => ({
            ...comment,
            replies: comment.replies
              ? removeCommentRecursive(comment.replies, targetId)
              : [],
          }));
      };
      setComments((prev) => removeCommentRecursive(prev, commentId));
      toast.success("Komentar  berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus komentar", err);
      toast.error("Gagal menghapus komentar!");
    }
  };

  //chat ke seller
  const handleChatSeller = async () => {
    setIsChatLoading(true);
    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create-or-get-chat`,
        {
          target_user_id: post?.seller?.id, // sesuaikan
          post_id: post?.id, // opsional, kalau mau buat pesan template
        }
      );

      // console.log("Response dari chat:", response.data);
      // console.log("CHannel url:", response.data.channel_url); 
      

      const channelUrl = response.data.channel_url;

      router.push(`/chat?channelUrl=${encodeURIComponent(channelUrl)}`);
    } catch (error) {
      console.error("Gagal memulai chat:", error);
      alert("Gagal memulai chat");
    } finally {
      setIsChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-500 mb-4">
            {error || "Postingan tidak ditemukan"}
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 mt-6 px-4 md:px-8 lg:px-16 bg-gray-100 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6  transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Kembali
        </button>

        {/* Post Card */}
        {/* Post Card */}
<div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
  {/* Seller Info - Tidak diubah */}
  <div className="p-6 border-b border-gray-200">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
          {post.seller.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {post.seller.name}
          </h2>
          <div className="flex flex-wrap gap-2 mt-1">
            {post.categories.map((category, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
      {currentUser &&
      (currentUser?.id == post.seller.id || currentUser.role === "admin" ) ? (
        <DeleteButton
          postId={post.id}
          onDeleteSuccess={handleDeleteSuccess}
        >
          <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500">
            <Trash2 className="h-4 w-4" size={20} />
          </button>
        </DeleteButton>
      ) : (currentUser?.role ==="midman") ? " " : (
        <button
          onClick={handleChatSeller}
          disabled={isChatLoading}
          className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition
    ${
      isChatLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-indigo-950 hover:bg-indigo-900"
    }
  `}
        >
          {isChatLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            "Chat Penjual"
          )}
        </button>
      )}
    </div>
  </div>

  {/* Post Content */}
  <div className="p-6">
    {/* Judul & Deskripsi - Responsive Text */}
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
      {post.title}
    </h1>
    <p className="text-sm sm:text-base text-gray-700 mb-4">{post.caption}</p>

    {/* Harga - Responsive Text */}
    <div className="mb-4">
      <span className="text-lg sm:text-xl font-bold text-blue-600">
        {formatPrice(post.price)}
      </span>
    </div>

    {/* Gambar - Responsive Grid & Ukuran */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
      {post.images.map((imgUrl, index) => (
        <div
          key={index}
          onClick={() => {
            setCurrentImageIndex(index);
            setOpenLightbox(true);
          }}
          className="relative h-48 sm:h-64 w-full rounded-lg overflow-hidden cursor-zoom-in"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${imgUrl}`}
            alt={`Post Image ${index + 1}`}
            priority
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      ))}
    </div>

    {/* Post Stats - Tidak diubah */}
    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-b border-gray-200 py-3 mb-4">
      <span className="text-xs md:text-sm">Diposting pada {formatDate(post.created_at)}</span>
      <div className="flex space-x-4">
        <span className="text-xs md:text-sm">{likeCount} Suka</span>
        <span className="text-xs md:text-sm">{post.comment_count} Komentar</span>
      </div>
    </div>

    {/* Action Buttons - Tidak diubah */}
    <div className="flex space-x-3">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
          liked
            ? "bg-blue-100 text-blue-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <ThumbsUp className="w-5 h-5" />
        <span>{liked ? "Disukai" : "Suka"}</span>
      </button>
      {currentUser?.id == post.seller.id || currentUser?.role === "seller" || currentUser?.role === "midman" || currentUser?.role === "admin" ? (
        ""
      ) : (
        <button
          className=" px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={onBuyClick}
        >
          Beli Sekarang
        </button>
      )}
    </div>
  </div>
</div>

        {/* Comments List */}
        <div className="divide-y divide-gray-200">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replyingTo={replyingTo}
                onReply={setReplyingTo}
                onDelete={handleDeleteComment}
                replyText={replyText}
                onReplyTextChange={setReplyText}
                onSubmitReply={handleAddComment}
                currentUserId={currentUser?.id} // Jika ada info user yang login
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              Belum ada komentar. Jadilah yang pertama berkomentar!
            </div>
          )}
        </div>

        {/* Add Comment */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
                {currentUser?.name.charAt(0).toUpperCase() || "Y"}
              </div>
            </div>
            <div className="flex-1">
              <textarea
                rows={3}
                className="w-full border border-gray-300 text-black rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={"Tulis komentar Anda..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
              />

              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!(replyingTo.id ? replyText : newComment).trim()}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                    (replyingTo.id ? replyText : newComment).trim()
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <span>
                    {replyingTo.id ? "Kirim Balasan" : "Kirim Komentar"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {openLightbox && (
          <Lightbox
            open={openLightbox}
            close={() => setOpenLightbox(false)}
            index={currentImageIndex}
            slides={post.images.map((img) => ({
              src: `${process.env.NEXT_PUBLIC_IMG_URL}${img}`,
            }))}
            controller={{ closeOnBackdropClick: true }}
            noScroll={{ disabled: true }}
            styles={{
              container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
            }}
          />
        )}
      </div>
    </div>
  );
}
