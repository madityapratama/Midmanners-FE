import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, ThumbsUp, X } from 'lucide-react';

export default function DetailPostinganViews() {
  const router = useRouter();

  // STATE: Komentar dan Balasannya
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Andi',
      avatar: '/avatar1.png',
      content: 'Barangnya bagus banget! Rekomended seller!',
      replies: [
        {
          id: 101,
          name: 'Rina',
          avatar: '/avatar2.png',
          content: 'Setuju kak, pelayanannya juga cepat!',
        },
      ],
    },
    {
      id: 2,
      name: 'Budi',
      avatar: '/avatar2.png',
      content: 'Sudah diterima, sesuai dengan deskripsi.',
      replies: [],
    },
  ]);

  // STATE: Komentar baru yang ingin ditambahkan
  const [newComment, setNewComment] = useState('');

  // STATE: Jumlah like & apakah user sudah like
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // STATE: Digunakan untuk membalas komentar tertentu
  const [replyingTo, setReplyingTo] = useState<{ id: number; name: string } | null>(null);
  const [replyText, setReplyText] = useState('');

  // Fungsi untuk mengirim komentar baru
  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newEntry = {
      id: Date.now(), // Sementara generate ID manual, ganti dengan ID dari API saat integrasi
      name: 'User Baru',
      avatar: '/avatar-placeholder.png',
      content: newComment,
      replies: [],
    };

    setComments([...comments, newEntry]); // Simpan lokal
    setNewComment('');

    // TODO: Panggil API POST /comments
    // await axios.post('/api/comments', newEntry)
  };

  // Fungsi untuk mengirim balasan ke komentar tertentu
  const handleReplySubmit = () => {
    if (!replyingTo || replyText.trim() === '') return;

    const updated = comments.map((comment) =>
      comment.id === replyingTo.id
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(), // Sementara
                name: 'User Baru',
                avatar: '/avatar-placeholder.png',
                content: replyText,
              },
            ],
          }
        : comment
    );

    setComments(updated); // Update state lokal
    setReplyingTo(null);
    setReplyText('');

    // TODO: Panggil API POST /comments/:id/replies
    // await axios.post(`/api/comments/${replyingTo.id}/replies`, { content: replyText })
  };

  // Fungsi untuk like atau unlike produk
  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);

    // TODO: Panggil API POST /likes (toggle)
    // await axios.post('/api/produk/:id/like')
  };

  return (
    <div className="pt-20 px-6 bg-gray-300 min-h-screen font-poppins text-indigo-950">
      {/* Tombol Kembali ke Dashboard */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <button onClick={() => router.push('/dashboard')} className="mb-2 text-sm flex items-center space-x-1 hover:underline">
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </button>

        {/* Info Produk & Penjual */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.png" className="w-12 h-12 rounded-full bg-gray-400" alt="seller" />
            <div>
              <h2 className="text-lg font-semibold">Nama Penjual</h2>
              <p className="text-sm text-gray-600">Kategori Game</p>
            </div>
          </div>
          <button
            className="bg-indigo-950 hover:bg-indigo-800 text-white text-sm px-4 py-2 rounded"
            onClick={() => alert('Chat Penjual')}
          >
            Chat Penjual
          </button>
        </div>

        {/* Deskripsi Produk */}
        <p className="text-sm">Lorem ipsum dolor sit amet...</p>

        {/* Gambar Produk */}
        <div className="flex space-x-4 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <img key={i} src="/placeholder.png" alt="produk" className="w-32 h-28 object-cover rounded" />
          ))}
        </div>

        {/* Tombol Like dan Beli */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded ${liked ? 'bg-blue-600 text-white' : 'bg-gray-200 text-indigo-950'}`}
            onClick={handleLike}
          >
            <ThumbsUp size={16} />
            <span>{likes}</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={() => alert('Beli Produk')}>
            Beli
          </button>
        </div>
      </div>

          {/* Komentar dan Balasan */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Komentar</h3>

            {/* Loop komentar utama */}
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-2 border-b pb-4">
                <div className="flex space-x-3 items-start">
                  <img src={comment.avatar} className="w-10 h-10 rounded-full" alt={comment.name} />
                  <div>
                    <p className="text-sm font-semibold">{comment.name}</p>
                    <p className="text-sm">{comment.content}</p>
                    <button
                      onClick={() =>
                        setReplyingTo(replyingTo?.id === comment.id ? null : { id: comment.id, name: comment.name })
                      }
                      className="text-blue-600 text-xs mt-1 hover:underline"
                    >
                      Balas
                    </button>
                  </div>
                </div>

                {/* Loop balasan */}
                <div className="ml-12 space-y-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-3 items-start">
                      <img src={reply.avatar} className="w-8 h-8 rounded-full" alt={reply.name} />
                      <div>
                        <p className="text-sm font-semibold">{reply.name}</p>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Kolom Input Komentar & Balasan - 1 Kolom Saja */}
            <div className="pt-4 border-t border-gray-300 mt-4">
              {replyingTo && (
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-600">
                    Membalas ke: <span className="font-semibold">{replyingTo.name}</span>
                  </p>
                  <button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyText('');
                    }}
                    className="text-gray-600 hover:text-red-500 text-sm flex items-center gap-1"
                  >
                    <X size={14} /> Batal
                  </button>
                </div>
              )}

              <textarea
                rows={2}
                className="w-full border border-gray-300 rounded p-2 text-sm"
                placeholder={replyingTo ? `Tulis balasan untuk ${replyingTo.name}...` : 'Tulis komentar...'}
                value={replyingTo ? replyText : newComment}
                onChange={(e) =>
                  replyingTo ? setReplyText(e.target.value) : setNewComment(e.target.value)
                }
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={replyingTo ? handleReplySubmit : handleAddComment}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                >
                  {replyingTo ? 'Kirim Balasan' : 'Kirim Komentar'}
                </button>
              </div>
            </div>
          </div>
    </div>
  );
}
