"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Truck, PackageCheck, CheckCircle, Pencil, Store, LogOut, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilBuyerViews() {
  const router = useRouter();
  const { logout, profile, fetchProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!profile) {
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [profile, fetchProfile]);
  
  const imageUrl = `${process.env.NEXT_PUBLIC_IMG_URL}${profile?.profile_image}`;

  const handleNavigateToAktivitas = (tab: string) => {
    router.push(`/buyer/aktivitas?tab=${tab}`);
  };

  const handleDaftarSeller = () => {
    router.push("/daftarSeller");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/auth/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f2f2f6]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-950"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f6] font-poppins text-indigo-950 pb-10">
  {/* Cover Photo */}
  <div 
    className="relative h-[200px] sm:h-[250px] w-full overflow-hidden"
    style={{
      backgroundImage: profile?.background_image 
        ? `url('${process.env.NEXT_PUBLIC_IMG_URL}${profile.background_image}')`
        : "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
    <div className="absolute bottom-4 right-4 z-10">
      <button
        onClick={() => router.push("/buyer/edit")}
        className="bg-white/90 text-indigo-950 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <Pencil size={16} />
        Edit Profil
      </button>
    </div>
  </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 pt-6 max-w-6xl mx-auto mt-10">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 -mt-12 border-4 border-white rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shadow-lg">
              {profile?.profile_image ? (
                <Image
                  src={imageUrl}
                  priority
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-indigo-950/30 flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">
                    {profile?.name?.charAt(0) || "P"}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold font-calsans">{profile?.name || "Nama Pembeli"}</h2>
              <p className="text-sm text-indigo-950/80 mt-1">{profile?.email || "email@example.com"}</p>
            </div>
          </div>

          {/* Start Selling Button */}
          <button
            onClick={handleDaftarSeller}
            className="flex items-center gap-2 bg-white border border-indigo-950 rounded-full px-4 py-2 text-indigo-950 text-sm font-semibold hover:bg-indigo-50 hover:shadow-md transition-all"
          >
            <Store size={16} />
            Mulai Jualan
          </button>
        </div>

        <hr className="my-6 border-indigo-950/20" />

        {/* Activities Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg mb-4 font-calsans">Aktivitas</h3>
          <div className="grid grid-cols-3 gap-4 text-center font-poppins">
            {[
              { 
                icon: <Truck size={30} className="mx-auto" />, 
                label: 'Menunggu Dikirim', 
                tab: "menunggu",
                hoverColor: "hover:text-blue-600"
              },
              { 
                icon: <PackageCheck size={30} className="mx-auto" />, 
                label: 'Sudah Terkirim', 
                tab: "terkirim",
                hoverColor: "hover:text-green-600"
              },
              { 
                icon: <CheckCircle size={30} className="mx-auto" />, 
                label: 'Selesai', 
                tab: "selesai",
                hoverColor: "hover:text-emerald-600"
              },
            ].map((item) => (
              <div
                key={item.tab}
                onClick={() => handleNavigateToAktivitas(item.tab)}
                className={`cursor-pointer p-4 rounded-lg bg-[#f2f2f6] hover:bg-indigo-950 hover:text-white transition-all group ${item.hoverColor}`}
              >
                <div className="flex flex-col items-center justify-center text-indigo-950 mb-2 group-hover:text-white">
                  {item.icon}
                </div>
                <p className="text-xs font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-950 text-white rounded-full hover:bg-indigo-900 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {isLoggingOut ? (
              <>
                <Loader size={16} className="animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <LogOut size={16} />
                Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}