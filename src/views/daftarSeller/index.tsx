import React, { useState } from "react";
import { useRouter } from "next/router";


export default function DaftarSellerViews () {
  const [jenisPembayaran, setJenisPembayaran] = useState("");
  const [namaBank, setNamaBank] = useState("");
  const [namaEwallet, setNamaEwallet] = useState("");
  const [nomorRek, setNomorRek] = useState("");

  const router = useRouter();

  const handleback = () => {
    router.push('/buyer/profil')
  };
  
  return (
    <div className="min-h-screen bg-white p-6 flex items-center justify-center">
      <div className="bg-zinc-300 p-8 rounded-lg w-full max-w-xl text-black">
        <button
          onClick={handleback} // ✅ Navigasi Next.js
          className="mb-4 bg-indigo-950 text-white font-poppins px-4 py-2 rounded 
            hover:bg-indigo-800 hover:scale-105 transition duration-200 ease-in-out"
        >
          Kembali
        </button>
        {/* ...lanjutan kode */}
        {/* Upload Ikon & Sampul */}
        <div className="flex justify-around mb-8">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center relative">
              <span className="absolute bottom-0 right-0 bg-black text-white text-xs p-1 rounded-full">✎</span>
            </div>
            <p className="mt-2 text-indigo-950 font-calsans">Ikon Toko</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-zinc-800 rounded flex items-center justify-center relative">
              <span className="absolute bottom-0 right-0 bg-black text-white text-xs p-1 rounded-full">✎</span>
            </div>
            <p className="mt-2 text-indigo-950 font-calsans">Sampul Toko</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Dropdown Jenis Pembayaran */}
          <div>
            <label className="block font-poppins text-indigo-950 font-medium mb-1">Jenis Pembayaran</label>
            <select
              className="w-full rounded px-3 py-2 font-poppins text-indigo-950 border border-indigo-950" // ✅ Tambahan border
              value={jenisPembayaran}
              onChange={(e) => {
                setJenisPembayaran(e.target.value);
                setNamaBank("");
                setNamaEwallet("");
              }}
            >
              <option value="">-- Pilih Jenis --</option>
              <option value="bank">Bank</option>
              <option value="ewallet">E-Wallet</option>
            </select>
          </div>

          {/* Nama Bank atau E-Wallet */}
          {jenisPembayaran === "bank" && (
            <div>
              <label className="block font-medium mb-1 text-indigo-950 font-poppins">Nama Bank</label>
              <select
                className="w-full rounded px-3 py-2 text-indigo-950 border border-indigo-950" // ✅ Tambahan border
                value={namaBank}
                onChange={(e) => setNamaBank(e.target.value)}
              >
                <option value="">-- Pilih Bank --</option>
                <option value="BCA">BCA</option>
                <option value="BNI">BNI</option>
                <option value="BRI">BRI</option>
                <option value="Mandiri">Mandiri</option>
              </select>
            </div>
          )}

          {jenisPembayaran === "ewallet" && (
            <div>
              <label className="block font-medium mb-1 text-indigo-950 font-poppins">Nama E-Wallet</label>
              <select
                className="w-full rounded px-3 py-2 text-indigo-950 border border-indigo-950" // ✅ Tambahan border
                value={namaEwallet}
                onChange={(e) => setNamaEwallet(e.target.value)}
              >
                <option value="">-- Pilih E-Wallet --</option>
                <option value="OVO">OVO</option>
                <option value="DANA">DANA</option>
                <option value="GoPay">GoPay</option>
                <option value="ShopeePay">ShopeePay</option>
              </select>
            </div>
          )}

          {/* No Rekening atau E-Wallet */}
          {jenisPembayaran && (
            <div>
              <label className="block font-medium mb-1 font-poppins text-indigo-950">
                {jenisPembayaran === "bank" ? "No Rekening" : "No E-Wallet"}
              </label>
              <input
                type="text"
                className="w-full rounded px-3 py-2 border border-indigo-950" // ✅ Tambahan border
                value={nomorRek}
                onChange={(e) => setNomorRek(e.target.value)}
              />
            </div>
          )}

          {/* NIK */}
          <div>
            <label className="block text-indigo-950 font-medium mb-1">NIK</label>
            <input type="text" className="w-full rounded px-3 py-2 border border-indigo-950" /> {/* ✅ Tambahan border */}
          </div>

          {/* Upload KTP */}
          <div>
            <label className="block font-medium mb-1 text-indigo-950">Foto KTP</label>
            <input
              type="file"
              className="w-full border border-indigo-950 rounded px-3 py-2" // ✅ Tambahan border
              accept="image/png, image/jpeg"
            />
            <p className="text-xs mt-1 text-indigo-950">Pastikan Gambar Berformat .JPG/.PNG</p>
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-indigo-950 text-white font-poppins px-6 py-2 rounded hover:bg-indigo-800 hover:scale-105 transition duration-200 ease-in-out">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
