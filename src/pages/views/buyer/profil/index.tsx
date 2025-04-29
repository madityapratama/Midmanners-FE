"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <- tambahkan ini
import Image from "next/image";
import { Truck, PackageCheck, CheckCircle, Pencil, Store } from "lucide-react";

export default function ProfilBuyerViews() {
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const router = useRouter(); // <- buat router

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // function untuk handle klik aktivitas
  const handleNavigateToAktivitas = (tab: string) => {
    router.push(`/buyer/aktivitas?tab=${tab}`);
  };

  return (
    <div className="pt-14">
      {/* Foto Sampul */}
      <div
        className="relative bg-gray-700 text-white text-center min-h-[300px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: coverPhoto ? `url(${coverPhoto})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-4 right-4 flex gap-2">
          <label className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-white transition backdrop-blur-sm cursor-pointer flex items-center">
            Upload Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
          </label>
          <button className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-white transition backdrop-blur-sm flex items-center gap-2">
            <Pencil size={14} />
            Edit Profil
          </button>
        </div>
      </div>

      {/* Profil Section */}
      <div className="flex flex-col mt-8 px-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <Image
              src="/placeholder-profile.png"
              alt="Profile"
              width={105}
              height={105}
            />
          </div>
          <h2 className="text-2xl font-bold">Nama Pembeli</h2>
        </div>
      </div>

      {/* Tombol Mulai Jualan */}
      <div className="flex justify-end mt-6 px-6">
        <button className="flex items-center gap-2 bg-white border border-gray-400 rounded-full px-4 py-2 text-black text-sm font-semibold hover:bg-gray-100 transition">
          <Store size={16} />
          Mulai Jualan
        </button>
      </div>

      {/* Riwayat Aktivitas */}
      <div className="mt-12 px-4">
        <h3 className="text-xl font-bold mb-6">Riwayat Aktivitas</h3>
        <div className="flex justify-around">
          {/* Menunggu Dikirim */}
          <div
            className="flex flex-col items-center group hover:scale-110 hover:text-blue-600 transition cursor-pointer"
            onClick={() => handleNavigateToAktivitas('menunggu')}
          >
            <Truck className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Menunggu Dikirim</p>
          </div>

          {/* Sudah Terkirim */}
          <div
            className="flex flex-col items-center group hover:scale-110 hover:text-green-600 transition cursor-pointer"
            onClick={() => handleNavigateToAktivitas('terkirim')}
          >
            <PackageCheck className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Sudah Terkirim</p>
          </div>

          {/* Selesai */}
          <div
            className="flex flex-col items-center group hover:scale-110 hover:text-emerald-600 transition cursor-pointer"
            onClick={() => handleNavigateToAktivitas('selesai')}
          >
            <CheckCircle className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Selesai</p>
          </div>
        </div>

        {/* Tombol Logout */}
        <div className="flex justify-center mt-20 mb-15">
          <button className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
