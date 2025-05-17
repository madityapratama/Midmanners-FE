import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DetailPostinganViews() {
    const router = useRouter(); // <-- Tambahkan ini
  
    const [comments, setComments] = useState([
      {
        id: 1,
        name: 'Andi',
        avatar: '/avatar1.png',
        content: 'Barangnya bagus banget! Rekomended seller!',
      },
      {
        id: 2,
        name: 'Budi',
        avatar: '/avatar2.png',
        content: 'Sudah diterima, sesuai dengan deskripsi.',
      },
    ]);
  
    const [newComment, setNewComment] = useState('');
  
    const handleAddComment = () => {
      if (newComment.trim() === '') return;
  
      const newEntry = {
        id: comments.length + 1,
        name: 'User Baru',
        avatar: '/avatar-placeholder.png',
        content: newComment,
      };
  
      setComments([...comments, newEntry]);
      setNewComment('');
    };
  
    return (
      <div className="pt-20 px-6 bg-gray-300 min-h-screen">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          {/* Tombol Kembali */}
          <div>
            <button
              onClick={() => router.push('/dashboard')}
              className="mb-2 text-sm text-black hover:underline"
            >
              ← Kembali
            </button>
          </div>
  
          {/* Header Penjual */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                <img src="/placeholder.png" alt="avatar" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg text-black font-semibold">Nama Penjual</h2>
                <p className="text-sm text-gray-600">Kategori Game</p>
              </div>
            </div>
            <button className="bg-gray-200 text-black text-sm px-3 py-1 rounded font-semibold">
              Chat Penjual
            </button>
          </div>
  
          {/* Deskripsi */}
          <p className="text-sm text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.
          </p>
  
          {/* Gambar Produk */}
          <div className="flex space-x-4 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="w-32 h-28 bg-gray-400 rounded flex items-center justify-center">
                <img src="/placeholder.png" alt="gambar" className="w-24 h-20" />
              </div>
            ))}
          </div>
  
          {/* Tombol Aksi */}
          <div className="flex justify-end space-x-3 pt-4">
            <button className="bg-gray-800 text-white p-2 rounded">👍</button>
            <button className="bg-gray-400 text-black px-4 py-2 rounded">Beli</button>
          </div>
        </div>
  
        {/* Komentar */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-black">Komentar</h3>
  
          {/* Daftar Komentar */}
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4">
              <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full bg-gray-300" />
              <div>
                <p className="text-sm font-semibold text-black">{comment.name}</p>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
  
          {/* Input Komentar Baru */}
          <div className="pt-4 border-t border-gray-300">
            <textarea
              rows={2}
              className="w-full border text-black border-gray-300 rounded p-2 text-sm"
              placeholder="Tulis komentar..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddComment}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded"
              >
                Kirim Komentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  