import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { User, Image as ImageIcon, FileClock, Repeat, ListPlus, Edit2, LogOut } from 'lucide-react';

export default function AdminProfile() {
  const router = useRouter();
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

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

  const handleLogout = () => {
    // TODO: Implementasi logout API
    console.log('Logout clicked');
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

      {/* Logout Button */}
      <div className="mt-10 flex justify-center">
        <button 
          onClick={handleLogout} 
          className="bg-indigo-950 text-white px-6 py-2 rounded shadow hover:bg-red-500 transition flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}