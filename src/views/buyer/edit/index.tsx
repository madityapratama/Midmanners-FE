import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { Pencil, X, Check, Upload, Image as ImageIcon, Loader } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export default function EditProfilBuyerViews() {
  const { fetchProfile } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    jenis_pembayaran: '',
    akun_bank: '',
    no_rek: '',
    name: '',
    email: ''
  });

  const [fotoProfil, setFotoProfil] = useState<File | null>(null);
  const [fotoSampul, setFotoSampul] = useState<File | null>(null);
  const [preview, setPreview] = useState({
    profil: '',
    sampul: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const profileData = response.data;
        setFormData({
          jenis_pembayaran: profileData.jenis_pembayaran || '',
          akun_bank: profileData.akun_bank || '',
          no_rek: profileData.no_rek || '',
          name: profileData.name || '',
          email: profileData.email || ''
        });

        // Set preview images if they exist
        if (profileData.profile_image) {
          setPreview(prev => ({
            ...prev,
            profil: `${process.env.NEXT_PUBLIC_IMG_URL}${profileData.profile_image}`
          }));
        }
        
        if (profileData.background_image) {
          setPreview(prev => ({
            ...prev,
            sampul: `${process.env.NEXT_PUBLIC_IMG_URL}${profileData.background_image}`
          }));
        }

      } catch (error) {
        toast.error('Gagal memuat data profil');
        console.log(error);
      } finally {
        setInitialLoad(false);
      }
    };

    fetchUserProfile();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'profil' | 'sampul'
  ) {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreview(prev => ({
            ...prev,
            [type]: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);

      if (type === 'profil') {
        setFotoProfil(file);
      } else {
        setFotoSampul(file);
      }
    } else {
      toast.error('Pastikan gambar berformat .JPG/.PNG');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();
    
    // Append all fields
    data.append('_method', 'PATCH'); // Important for Laravel
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('jenis_pembayaran', formData.jenis_pembayaran);
    data.append('akun_bank', formData.akun_bank);
    data.append('no_rek', formData.no_rek);
    
    // Append files - ensure correct field names
    if (fotoProfil) {
      data.append('profile_image', fotoProfil);
    }
    if (fotoSampul) {
      data.append('background_image', fotoSampul);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/profile`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    toast.success(response.data.message);
    // Refresh profile data
    await fetchProfile();
    
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Gagal menyimpan data';
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
}

  const handleProfil = () => {
    router.push('/buyer/profil');
  };

  if (initialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-950"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f6]">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <button
          className="mb-4 px-4 py-2 bg-indigo-950 text-white rounded-full hover:bg-indigo-800 transition flex items-center gap-2"
          onClick={handleProfil}
        >
          <X size={16} />
          Kembali
        </button>

        {/* Foto Sampul */}
        <div className="mb-4">
          <label className="relative block w-full h-32 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 border-dashed border-gray-300">
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={(e) => handleImageChange(e, 'sampul')}
            />
            {preview.sampul ? (
              <img src={preview.sampul} alt="Sampul" className="object-cover w-full h-full" />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-sm text-gray-500">
                <Upload size={24} className="mb-2" />
                Tambah Foto Sampul
              </div>
            )}
            <span className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow">
              <Pencil size={16} className="text-indigo-950" />
            </span>
          </label>
        </div>

        {/* Foto Profil */}
        <div className="flex justify-center mb-4 -mt-16">
          <label className="relative">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'profil')}
              accept="image/png, image/jpeg"
            />
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center overflow-hidden shadow-lg">
              {preview.profil ? (
                <img src={preview.profil} alt="Profil" className="object-cover w-full h-full" />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <ImageIcon size={24} />
                </div>
              )}
            </div>
            <span className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
              <Pencil size={16} className="text-indigo-950" />
            </span>
          </label>
        </div>

        <p className="text-xs text-center text-gray-500 mb-6">Format gambar: .JPG atau .PNG</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border text-gray-500 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border text-gray-500 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Pembayaran</label>
            <select
              name="jenis_pembayaran"
              value={formData.jenis_pembayaran}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">-- Pilih Jenis Pembayaran --</option>
              <option value="BANK">Bank Transfer</option>
              <option value="E-WALLET">E-Wallet</option>
            </select>
          </div>

          {formData.jenis_pembayaran === 'BANK' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bank</label>
                <select
                  name="akun_bank"
                  value={formData.akun_bank}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">-- Pilih Bank --</option>
                  <option value="BCA">BCA</option>
                  <option value="BRI">BRI</option>
                  <option value="BNI">BNI</option>
                  <option value="Mandiri">Mandiri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening</label>
                <input
                  type="text"
                  name="no_rek"
                  value={formData.no_rek}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </>
          )}

          {formData.jenis_pembayaran === 'E-WALLET' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama E-Wallet</label>
                <select
                  name="akun_bank"
                  value={formData.akun_bank}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">-- Pilih E-Wallet --</option>
                  <option value="DANA">DANA</option>
                  <option value="OVO">OVO</option>
                  <option value="Gopay">Gopay</option>
                  <option value="ShopeePay">ShopeePay</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor E-Wallet</label>
                <input
                  type="text"
                  name="no_rek"
                  value={formData.no_rek}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-full font-medium text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-950 hover:bg-indigo-900'
              } transition flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}