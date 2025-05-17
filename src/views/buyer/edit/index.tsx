import { useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export default function EditProfilBuyerViews() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    jenisPembayaran: '',
    namaBank: '',
    nomorRekening: '',
    nomorEwallet: '',
  });

  const [fotoProfil, setFotoProfil] = useState<string | null>(null);
  const [fotoSampul, setFotoSampul] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state untuk tombol

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
          if (type === 'profil') setFotoProfil(reader.result);
          else setFotoSampul(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Pastikan gambar berformat .JPG/.PNG');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulasi pengiriman data API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Data dikirim:', { formData, fotoProfil, fotoSampul });

      // ✅ TOAST YANG BISA DIHUBUNGKAN KE RESPONSE API
      toast.success('Profil berhasil diperbarui!');
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // ❌ TOAST UNTUK ERROR API
      toast.error('Gagal menyimpan data!');
    } finally {
      setLoading(false);
    }
  }

  const handleProfil = () => {
    router.push('/buyer/profil')
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-zinc-400 p-8 rounded-lg w-full max-w-md shadow-lg">
        <button
          className="mb-4 px-4 py-1 bg-indigo-950 text-zinc-200 rounded hover:bg-indigo-800 hover:scale-105 transition duration-200 ease-in-out"
          onClick={handleProfil}
        >
          Kembali
        </button>

        {/* Foto Sampul */}
        <div className="mb-4">
          <label className="relative block w-full h-32 bg-white border border-black rounded overflow-hidden cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={(e) => handleImageChange(e, 'sampul')}
            />
            {fotoSampul ? (
              <img src={fotoSampul} alt="Sampul" className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm text-indigo-950">
                Tambah Foto Sampul
              </div>
            )}
            <span className="absolute bottom-1 right-2 text-xl">✏️</span>
          </label>
        </div>

        {/* Foto Profil */}
        <div className="flex justify-center mb-4">
          <label className="relative">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'profil')}
              accept="image/png, image/jpeg"
            />
            <div className="w-20 h-20 rounded-full bg-white border border-black flex items-center justify-center overflow-hidden">
              {fotoProfil ? (
                <img src={fotoProfil} alt="Profil" className="object-cover w-full h-full" />
              ) : (
                <span className="text-sm text-indigo-950">Foto</span>
              )}
            </div>
            <span className="absolute bottom-0 right-0 text-xl">✏️</span>
          </label>
        </div>

        <p className="text-xs text-center text-indigo-950 mb-4">Pastikan Gambar Berformat .JPG/.PNG</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-indigo-950">Jenis Pembayaran</label>
            <select
              name="jenisPembayaran"
              value={formData.jenisPembayaran}
              onChange={handleChange}
              className="w-full text-indigo-950 px-3 py-1 rounded border"
              required
            >
              <option value="">-- Pilih --</option>
              <option value="bank">Bank</option>
              <option value="ewallet">E-Wallet</option>
            </select>
          </div>

          {formData.jenisPembayaran === 'bank' && (
            <>
              <div>
                <label className="block text-indigo-950">Nama Bank</label>
                <select
                  name="namaBank"
                  value={formData.namaBank}
                  onChange={handleChange}
                  className="w-full text-indigo-950 px-3 py-1 rounded border"
                  required
                >
                  <option value="">-- Pilih Bank --</option>
                  <option value="BCA">BCA</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="CIMB">CIMB</option>
                </select>
              </div>
              <div>
                <label className="block text-indigo-950">Nomor Rekening</label>
                <input
                  type="text"
                  name="nomorRekening"
                  value={formData.nomorRekening}
                  onChange={handleChange}
                  className="w-full text-indigo-950 px-3 py-1 rounded border"
                  required
                />
              </div>
            </>
          )}

          {formData.jenisPembayaran === 'ewallet' && (
            <>
              <div>
                <label className="block text-indigo-950">Jenis E-Wallet</label>
                <select
                  name="nomorEwallet"
                  value={formData.nomorEwallet}
                  onChange={handleChange}
                  className="w-full px-3 text-indigo-950 py-1 rounded border"
                  required
                >
                  <option value="">-- Pilih E-Wallet --</option>
                  <option value="Dana">Dana</option>
                  <option value="Gopay">Gopay</option>
                  <option value="ShopeePay">ShopeePay</option>
                  <option value="OVO">OVO</option>
                  <option value="LinkAja">LinkAja</option>
                </select>
              </div>
              <div>
                <label className="block text-indigo-950">Nomor E-Wallet</label>
                <input
                  type="text"
                  name="nomorRekening"
                  value={formData.nomorRekening}
                  onChange={handleChange}
                  className="w-full px-3 text-indigo-950 py-1 rounded border"
                  required
                />
              </div>
            </>
          )}

          {/* Tombol Simpan */}
          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-1 rounded ${
                loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-950 text-zinc-200'
              } transition-transform transform active:scale-95`}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
