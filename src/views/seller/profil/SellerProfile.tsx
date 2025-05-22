// pages/seller/profil.tsx
import { useRouter } from "next/router";
import {
  Pencil,
  Tag,
  List,
  Loader,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SellerProfileViews() {
  const router = useRouter();
  const { logout, profile, fetchProfile } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const sellerData = {
  //   name: 'Nama Penjual/Toko',
  //   coverImage: '',
  //   avatarImage: '',
  //   joinDate: 'Bergabung sejak Januari 2023',
  //   rating: 4.8,
  //   totalProducts: 42,
  // };
  useEffect(() => {
    if (!profile) {
      fetchProfile().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [profile, fetchProfile]);

  const imageUrl = `${process.env.NEXT_PUBLIC_IMG_URL}${profile?.profile_image}`;

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f6] font-poppins text-indigo-950 pb-10">
      {/* Foto Sampul */}
      <div
        className="relative h-[200px] sm:h-[250px] w-full overflow-hidden"
        style={{
          backgroundImage: profile?.background_image
            ? `url('${process.env.NEXT_PUBLIC_IMG_URL}${profile.background_image}')`
            : "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => router.push("/seller/edit")}
            className="bg-white/90 text-indigo-950 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Pencil size={16} />
            Edit Profil
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="px-4 sm:px-6 pt-6 max-w-6xl mx-auto">
        {/* Info Profil */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
          <div className="flex items-center gap-4">
              {/* Placeholder avatar - bisa diganti dengan gambar */}
            <div className="w-24 h-24 -mt-11 border-4 border-white rounded-full bg-gray-300 flex items-center justify-center text-white text-sm overflow-hidden shadow-lg">
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
              <h2 className="text-2xl font-bold font-calsans">
                {profile?.name}
              </h2>
              <p className="text-sm text-indigo-950/80 mt-1">
                {profile?.email || "email@example.com"}
              </p>
              <p className="text-sm text-indigo-950/80 mt-1">
                Role: {profile?.role || "email@example.com"}
              </p>
              {/* <p className="text-sm text-indigo-950/80">{sellerData.joinDate}</p> */}
              <div className="flex items-center mt-1 gap-2">
                <div className="flex items-center bg-indigo-950/5 px-2 py-1 rounded-full">
                  <span className="text-sm font-medium">
                    📦 {profile?.total_posts} Produk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-indigo-950/20" />

        {/* Menu Aktivitas */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg mb-4 font-calsans">Aktivitas Toko</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center font-poppins">
            {[
              {
                icon: <Tag size={30} className="mx-auto" />,
                label: "Buat Jualan",
                path: "/seller/buatJualan",
              },
              {
                icon: <List size={30} className="mx-auto" />,
                label: "Daftar Jualan",
                path: "/seller/daftarJualan",
              },
              {
                icon: <Loader size={30} className="mx-auto" />,
                label: "Perlu Diproses",
                path: "/seller/aktivitas?tab=perluDiproses",
              },
              {
                icon: <Clock size={30} className="mx-auto" />,
                label: "Menunggu Konfirmasi",
                path: "/seller/aktivitas?tab=menungguKonfirmasi",
              },
              {
                icon: <CheckCircle size={30} className="mx-auto" />,
                label: "Pesanan Selesai",
                path: "/seller/aktivitas?tab=pesananSelesai",
              },
              {
                icon: <XCircle size={30} className="mx-auto" />,
                label: "Dibatalkan",
                path: "/seller/aktivitas?tab=dibatalkan",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => navigateTo(item.path)}
                className="cursor-pointer p-4 rounded-xl bg-[#f2f2f6] hover:bg-indigo-950 hover:text-white transition-all group"
              >
                <div className="flex flex-col items-center justify-center text-indigo-950 mb-2 group-hover:text-white">
                  {item.icon}
                </div>
                <p className="text-xs font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Logout */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-950 text-white rounded-full hover:bg-indigo-900 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {isLoading ? (
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
