import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ThumbsUp, ArrowLeft, Send } from 'lucide-react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

type PostDetail = {
  id: number;
  title: string;
  caption: string;
  price: number;
  images: string[];
  seller: {
    name: string;
  };
  categories: string[];
  like_count: number;
  comment_count: number;
  created_at: string;
};

type Comment = {
  id: number;
  name: string;
  avatar: string;
  content: string;
  created_at: string;
};

export default function DetailPostinganViews() {
  const router = useRouter();
  const { id } = router.query;
  
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/detail`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setPost(response.data.data);
        setLikeCount(response.data.data.like_count);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post details');
        setLoading(false);
        console.error(err);
      }
    };

    const fetchComments = async () => {
      // You'll need to implement this API endpoint
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comment`
        );
        setComments(response.data.data);
      } catch (err) {
        console.error('Failed to fetch comments', err);
      }
    };

    fetchPostDetail();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setComments([...comments, response.data.data]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLikeCount(likeCount - 1);
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Failed to toggle like', err);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
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
          <p className="text-red-500 mb-4">{error || 'Post not found'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 px-4 md:px-8 lg:px-16 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        {/* Post Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          {/* Seller Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  {post.seller.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{post.seller.name}</h2>
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Chat Seller
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-gray-700 mb-4">{post.caption}</p>
            
            <div className="mb-4">
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(post.price)}
              </span>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {post.images.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setOpenLightbox(true);
                  }}
                  className="relative h-64 w-full rounded-lg overflow-hidden cursor-zoom-in"
                >
                  <Image
                    src={`http://localhost:8000/storage/${imgUrl}`}
                    alt={`Post Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>

            {/* Post Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-b border-gray-200 py-3 mb-4">
              <span>Posted on {formatDate(post.created_at)}</span>
              <div className="flex space-x-4">
                <span>{likeCount} Likes</span>
                <span>{post.comment_count} Comments</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  isLiked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Comments ({comments.length})</h3>
          </div>

          {/* Comments List */}
          <div className="divide-y divide-gray-200">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="p-6">
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-1">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>

          {/* Add Comment */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Send className="w-5 h-5" />
                    <span>Post Comment</span>
                  </button>
                </div>
              </div>
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
            src: `http://localhost:8000/storage/${img}`,
          }))}
          controller={{ closeOnBackdropClick: true }}
          noScroll={{ disabled: true }}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
          }}
        />
      )}
    </div>
  );
}