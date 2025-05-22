import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Plus, X, Loader2, Check } from 'lucide-react';
import api from '@/lib/axios';
import toast, { Toaster } from 'react-hot-toast';

interface Category {
  id: number;
  category_name: string;
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export default function BuatJualanViews() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    price: '',
  });
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Gagal memuat kategori');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).slice(2, 9)
      }));
      
      setImages(prev => [...prev, ...newImages].slice(0, 10));
      
      // Reset input to allow selecting same files again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Remove image
  const removeImage = (id: string) => {
    setImages(prev => {
      const newImages = prev.filter(img => img.id !== id);
      // Clean up memory
      const removedImg = prev.find(img => img.id === id);
      if (removedImg) URL.revokeObjectURL(removedImg.preview);
      return newImages;
    });
  };

  // Toggle category selection
  const toggleCategory = (id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  // Format price with thousand separators
  const formatPrice = (value: string) => {
    const num = value.replace(/\D/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.caption || !formData.price || selectedCategories.length === 0 || images.length === 0) {
      setError('Harap lengkapi semua data termasuk minimal 1 gambar dan 1 kategori.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('caption', formData.caption);
      formDataObj.append('price', formData.price.replace(/\./g, ''));
      
      // Add categories
      selectedCategories.forEach(catId => {
        formDataObj.append('categories[]', catId.toString());
      });
      
      // Add images - IMPORTANT: This is the fixed part
      images.forEach((img, index) => {
        formDataObj.append(`images[${index}]`, img.file);
      });

      // Debug: Log FormData contents
      // for (let [key, value] of formDataObj.entries()) {
      //   console.log(key, value);
      // }

      const response = await api.post('/posts', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      
        toast.success(response.data.message);
        setTimeout(() => {
          router.push('/seller/daftarDagangan');
        }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat membuat postingan');
      toast.error(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push('/seller/profil')} 
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2" size={20} />
            Kembali
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Buat Produk Jualan</h1>
          <div className="w-6"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Produk</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            {isLoadingCategories ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin h-5 w-5 text-indigo-600" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedCategories.includes(category.id)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {category.category_name}
                    {selectedCategories.includes(category.id) && (
                      <Check className="ml-1 inline" size={14} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">Rp</span>
              </div>
              <input
                type="text"
                value={formatPrice(formData.price)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, '');
                  if (!isNaN(Number(value))) {
                    setFormData({...formData, price: value});
                  }
                }}
                className="pl-10 w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Produk</label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({...formData, caption: e.target.value})}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={5}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Foto Produk</label>
            <div className="space-y-4">
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map(img => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.preview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg border border-gray-200"
                        onLoad={() => URL.revokeObjectURL(img.preview)}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 ${
                images.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  <Plus className="mb-2 text-gray-400" size={24} />
                  <p className="text-sm text-gray-500">
                    {images.length > 0 ? 'Tambahkan lebih banyak foto' : 'Unggah foto produk Anda'}
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting || images.length >= 10}
                  multiple
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Memproses...
                </>
              ) : (
                'Publikasikan Produk'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}