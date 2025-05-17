import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Plus } from 'lucide-react';

export default function BuatJualanViews() {
  const router = useRouter();

  const [kategori, setKategori] = useState('');
  const [nama, setNama] = useState('');
  const [gambar, setGambar] = useState<(File | null)[]>([null, null, null, null, null]);
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState('');

  const handleGambarChange = (index: number, file: File | null) => {
    const updated = [...gambar];
    updated[index] = file;
    setGambar(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = kategori && nama && deskripsi && harga && gambar.some((g) => g !== null);
    if (!isValid) {
      alert('Harap lengkapi semua data termasuk minimal 1 gambar.');
      return;
    }

    // TODO: Kirim data ke API
    // const formData = new FormData();
    // formData.append('kategori', kategori);
    // formData.append('nama', nama);
    // formData.append('deskripsi', deskripsi);
    // formData.append('harga', harga);
    // gambar.forEach((img, i) => {
    //   if (img) formData.append(`gambar${i + 1}`, img);
    // });
    // await axios.post('/api/seller/produk', formData);

    console.log({ kategori, nama, deskripsi, harga, gambar });
    alert('Produk berhasil dibuat!');
    router.push('/seller/daftarDagangan');
  };

  const handleBack = () => {
    router.push('/seller/profil');
  }

  return (
    <div className="min-h-screen bg-white text-indigo-950 font-poppins">
      <div className="max-w-3xl mx-auto px-4 mt-14 pt-4 pb-8">
        {/* Tombol Kembali */}
        <button onClick={handleBack} className="flex items-center mb-4 text-indigo-950 font-calsans">
          <ArrowLeft size={20} className="mr-2" />
          Buat Produk Jualan
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          {/* Kategori Game */}
          <div>
            <label className="block font-semibold text-sm mb-1">Kategori Game</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Pilih Kategori</option>
              <option value="Mobile Legends">Mobile Legends</option>
              <option value="Free Fire">Free Fire</option>
              <option value="PUBG Mobile">PUBG Mobile</option>
              <option value="Valorant">Valorant</option>
            </select>
          </div>

          {/* Nama Jualan */}
          <div>
            <label className="block font-semibold text-sm mb-1">Nama Jualan</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan Nama Item Yang Dijual"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Gambar Jualan */}
          <div>
            <label className="block font-semibold text-sm mb-1">Gambar Jualan</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {gambar.map((file, index) => (
                <label
                  key={index}
                  className="border border-dashed rounded-md h-24 flex flex-col items-center justify-center cursor-pointer text-xs text-gray-500"
                >
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Gambar ${index + 1}`}
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <>
                      <Plus size={20} />
                      Gambar {index + 1}
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleGambarChange(index, e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block font-semibold text-sm mb-1">Deskripsi Jualan</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={4}
            />
          </div>

          {/* Harga */}
          <div>
            <label className="block font-semibold text-sm mb-1">Harga Produk Jualan</label>
            <div className="flex items-center gap-2">
              <span className="text-sm">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="flex-1 border rounded px-3 py-2 appearance-none"
              />
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-indigo-950 text-white font-semibold hover:bg-indigo-800 transition"
            >
              Buat Produk Jualan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
