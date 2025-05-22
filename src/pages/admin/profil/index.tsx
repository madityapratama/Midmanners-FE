import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { User, Image as ImageIcon, FileClock, Repeat, ListPlus, Edit2, LogOut } from 'lucide-react';
import {
  Truck,
  PackageCheck,
  CheckCircle,
} from "lucide-react";

export default function AdminProfile() {
  const router = useRouter();
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
      // TODO: Implementasi upload foto sampul ke API
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(URL.createObjectURL(file));
      // TODO: Implementasi upload foto profil ke API
    }
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

  // Fungsi untuk navigasi ke halaman yang sesuai
  const navigateTo = (page) => {
    switch(page) {
      case 'listUser':
        router.push('/listUser');
        break;
      case 'pending-posts':
        router.push('/menungguPersetujuanPostingan');
        break;
      case 'seller-requests':
        router.push('/pengajuanMenjadiSeller');
        break;
      case 'add-category':
        router.push('/admin/add-category');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen pt-13 bg-gray-100 text-gray-900">
      {/* Cover Photo Section - Tombol edit di kanan bawah */}
      <div className="relative h-48 bg-gray-700 flex items-center justify-center">
        {cover && (
          <Image 
            src={cover} 
            alt="Cover" 
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        )}
        <label className="absolute bottom-4 right-4 bg-white/90 hover:bg-white transition p-2 rounded-full shadow-lg cursor-pointer">
          <input type="file" className="hidden" onChange={handleCoverChange} accept="image/*" />
          <Edit2 size={18} className="text-gray-700" />
        </label>
        <h1 className="text-white text-2xl font-bold z-10">FOTO SAMPUL</h1>
      </div>

      {/* Profile Section */}
      <div className="p-6 bg-white shadow-md relative">
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white -mt-12">
            {profile ? (
              <Image 
                src={profile} 
                alt="Profile" 
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                <ImageIcon className="text-gray-500" size={24} />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
              <input type="file" className="hidden" onChange={handleProfileChange} accept="image/*" />
              <Edit2 size={16} className="text-gray-700" />
            </label>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">Nama Admin</h2>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="mt-6 px-6">
        <h3 className="font-semibold mb-4">Aktivitas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* List User */}
          <div 
            onClick={() => navigateTo('listUser')}
            className="flex flex-col items-center bg-white p-4 rounded shadow hover:bg-gray-50 transition cursor-pointer hover:shadow-md"
          >
            <User size={32} className="mb-2" />
            <p className="text-sm text-center">List User</p>
          </div>

          {/* Postingan Menunggu Persetujuan */}
          <div 
            onClick={() => navigateTo('pending-posts')}
            className="flex flex-col items-center bg-white p-4 rounded shadow hover:bg-gray-50 transition cursor-pointer hover:shadow-md"
          >
            <FileClock size={32} className="mb-2" />
            <p className="text-sm text-center">Postingan Menunggu Persetujuan</p>
          </div>

          {/* Pengajuan Menjadi Seller */}
          <div 
            onClick={() => navigateTo('seller-requests')}
            className="flex flex-col items-center bg-white p-4 rounded shadow hover:bg-gray-50 transition cursor-pointer hover:shadow-md"
          >
            <Repeat size={32} className="mb-2" />
            <p className="text-sm text-center">Pengajuan Menjadi Seller</p>
          </div>

          {/* Tambah Kategori */}
          <div 
            onClick={() => navigateTo('add-category')}
            className="flex flex-col items-center bg-white p-4 rounded shadow hover:bg-gray-50 transition cursor-pointer hover:shadow-md"
          >
            <ListPlus size={32} className="mb-2" />
            <p className="text-sm text-center">Tambah Kategori</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg mb-4 font-calsans">Aktivitas</h3>
                <div className="grid grid-cols-4 gap-4 text-center font-poppins">
                  {[
                    {
                      icon: <User size={30} className="mx-auto" />,
                      label: "List User",
                      hoverColor: "hover:text-blue-600",
                    },
                    {
                      icon: <FileClock size={30} className="mx-auto" />,
                      label: "Postingan Menuggu Persetujuan",
                      hoverColor: "hover:text-green-600",
                    },
                    {
                      icon: <Repeat size={30} className="mx-auto" />,
                      label: "Pengajuan Menjadi Seller",
                      hoverColor: "hover:text-emerald-600",
                    },
                    {
                      icon: <ListPlus size={30} className="mx-auto" />,
                      label: "Tambah Kategori",
                      hoverColor: "hover:text-emerald-600",
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
  );
}