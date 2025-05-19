"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Truck, PackageCheck, CheckCircle, Pencil, Store, LogOut, } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilBuyerViews() {
  const router = useRouter();
  const { logout,profile,fetchProfile } = useAuth();
  const [loading, setLoading] = useState(true); // state loading
  // const [profile, setProfile] = useState<any>(null); // state profile

  // Jika perlu memastikan data terbaru
  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
      setLoading(false);
  }, []);
  
  const imageUrl = `${process.env.NEXT_PUBLIC_IMG_URL}${profile?.profile_image}`;

  const handleNavigateToAktivitas = (tab: string) => {
    router.push(`/buyer/aktivitas?tab=${tab}`);
  };

  const handleDaftarSeller = () => {
    router.push("/daftarSeller");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-14 bg-zinc-300 min-h-screen">
     {/* Header / Background Section */}
      <div 
        className="relative text-white text-center min-h-[300px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1200x300?text=Cover+Photo')`, // TODO: Ganti URL ini dengan foto sampul dari API
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-poppins font-medium hover:bg-white transition backdrop-blur-sm flex items-center gap-2"
            onClick={() => router.push("/buyer/edit")}
          >
            <Pencil size={14} />
            Edit Profil
          </button>
        </div>
      </div>

      {/* Profil Section */}
      <div className="flex flex-col mt-8 px-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
            <Image
              src={imageUrl}
              priority
              alt="Profile"
              width={105}
              height={105}
            />
          </div>
          <h2 className="text-2xl text-indigo-950 font-bold font-calsans">
            {profile?.name || "Nama Pembeli"}
          </h2>
        </div>
      </div>

      {/* Tombol Mulai Jualan */}
      <div className="flex justify-end mt-6 px-6 text-indigo-950">
        <button
          onClick={handleDaftarSeller}
          className="flex items-center gap-2 bg-white border font-poppins border-indigo-950 rounded-full px-4 py-2 text-indigo-950 text-sm font-semibold hover:bg-gray-100 hover:bg-indigo-800 hover:scale-105 transition duration-200 ease-in-out"
        >
          <Store size={16} />
          Mulai Jualan
        </button>
      </div>

      {/* Aktivitas */}
      <div className="mt-12 px-4">
        <h3 className="text-xl mb-6 font-calsans text-indigo-950">Aktivitas</h3>
        <div className="flex justify-center gap-70">
          <div
            className="flex flex-col items-center group hover:scale-110 hover:text-blue-600 transition cursor-pointer"
            onClick={() => handleNavigateToAktivitas("menunggu")}
          >
            <Truck className="w-8 h-8 mb-2 text-indigo-950" />
            <p className="text-sm font-semibold font-poppins text-indigo-950">
              Menunggu Dikirim
            </p>
          </div>
          <div
            className="flex flex-col items-center group hover:scale-110 hover:text-green-600 transition cursor-pointer"
            onClick={() => handleNavigateToAktivitas("terkirim")}
          >
            <PackageCheck className="w-8 h-8 mb-2 text-indigo-950" />
            <p className="text-sm font-semibold font-poppins text-indigo-950">
              Sudah Terkirim
            </p>
          </div>
          <div
            className="flex flex-col items-center group hover:scale-110 hover:text-emerald-600 transition cursor-pointer"
            onClick={() => handleNavigateToAktivitas("selesai")}
          >
            <CheckCircle className="w-8 h-8 mb-2 text-indigo-950" />
            <p className="text-sm font-semibold font-poppins text-indigo-950">
              Selesai
            </p>
          </div>
        </div>
      </div>

      {/* Tombol Logout */}
      <div className="flex justify-center mt-20 py-10 bg-zinc-300">
        <button
          onClick={logout}
          className="flex items-center gap-2 font-poppins bg-indigo-950 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 hover:scale-105 transition duration-200 ease-in-out"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
}
