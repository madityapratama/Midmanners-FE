import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  User,
  FileClock,
  Repeat,
  ListPlus,
  Edit2,
  LogOut,
  Loader,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const  AdminProfile = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState({
    background: false,
    profile: false,
  });
  const { profile, fetchProfile, logout } = useAuth();

  useEffect(() => {
    if (!profile) {
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [profile, fetchProfile]);

  const handleImageUpload = async (file, type) => {
    if (!file) return;

    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const formData = new FormData();

      formData.append("_method", "PATCH");
      if (type === "background") {
        formData.append("background_image", file);
      } else {
        formData.append("profile_image", file);
      }

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      await fetchProfile();
    } catch (error) {
      console.error(`Error uploading ${type} image:`, error);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file, "background");
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file, "profile");
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

  const navigateTo = (page) => {
    switch (page) {
      case "listUser":
        router.push("/listUser");
        break;
      case "pending-posts":
        router.push("/menungguPersetujuanPostingan");
        break;
      case "seller-requests":
        router.push("/pengajuanMenjadiSeller");
        break;
      case "add-category":
        router.push("/admin/categories");
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader className="animate-spin text-indigo-950" />
      </div>
    );
  }

  return (
  <div className="min-h-screen pt-13 bg-gray-100 text-indigo-950">
    {/* Cover Photo Section */}
    <div
      className="relative h-[150px] sm:h-[200px] md:h-[250px] w-full overflow-hidden"
      style={{
        backgroundImage: profile?.background_image
          ? `url('${process.env.NEXT_PUBLIC_IMG_URL}${profile.background_image}')`
          : "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <label className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
        <input
          type="file"
          className="hidden"
          onChange={handleCoverChange}
          accept="image/*"
          disabled={uploading.background}
        />
        <div className="bg-white/90 hover:bg-white text-indigo-950 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg cursor-pointer">
          {uploading.background ? (
            <>
              <Loader size={16} className="animate-spin" />
              <span className="hidden xs:inline">Uploading...</span>
            </>
          ) : (
            <>
              <Edit2 size={16} />
              <span className="hidden xs:inline">Edit Cover</span>
            </>
          )}
        </div>
      </label>
    </div>

    {/* Profile Section */}
    <div className="px-4 sm:px-6 pt-4 sm:pt-6 max-w-6xl mx-auto relative mt-8 sm:mt-10">
      <div className="flex relative flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex relative items-center gap-3 sm:gap-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 -mt-10 sm:-mt-12">
            {/* Profile Circle */}
            <div className="w-full h-full border-4 border-white rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shadow-lg z-20">
              {profile?.profile_image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${profile.profile_image}`}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-indigo-950/30 flex items-center justify-center text-white">
                  <span className="text-xl sm:text-2xl font-bold">
                    {profile?.name?.charAt(0)?.toUpperCase() || "A"}
                  </span>
                </div>
              )}
            </div>

            <label className="absolute -bottom-1 -right-1 z-30 bg-white p-1 sm:p-1.5 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
              <input
                type="file"
                className="hidden"
                onChange={handleProfileChange}
                accept="image/*"
                disabled={uploading.profile}
              />
              {uploading.profile ? (
                <Loader size={14} className="animate-spin text-indigo-600" />
              ) : (
                <Edit2 size={14} className="text-gray-700" />
              )}
            </label>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {profile?.name || "Admin User"}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-950/80 mt-0.5 sm:mt-1">
              {profile?.email || "admin@example.com"}
            </p>
            <p className="text-xs sm:text-sm text-indigo-950/80 mt-0.5 sm:mt-1">
              Role: {profile?.role || "admin"}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-4 sm:my-6 border-indigo-950/20" />

      {/* Activities Section */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg mb-3 sm:mb-4 font-bold">Aktivitas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
          {[
            {
              icon: <User size={24} className="mx-auto sm:h-7 sm:w-7" />,
              label: "List User",
              tab: "listUser",
              hoverColor: "hover:text-blue-600",
            },
            {
              icon: <FileClock size={24} className="mx-auto sm:h-7 sm:w-7" />,
              label: "Postingan Menunggu",
              tab: "pending-posts",
              hoverColor: "hover:text-green-600",
            },
            {
              icon: <Repeat size={24} className="mx-auto sm:h-7 sm:w-7" />,
              label: "Pengajuan Seller",
              tab: "seller-requests",
              hoverColor: "hover:text-emerald-600",
            },
            {
              icon: <ListPlus size={24} className="mx-auto sm:h-7 sm:w-7" />,
              label: "Tambah Kategori",
              tab: "add-category",
              hoverColor: "hover:text-emerald-600",
            },
          ].map((item) => (
            <div
              key={item.tab}
              onClick={() => navigateTo(item.tab)}
              className={`cursor-pointer p-2 sm:p-4 rounded-lg bg-[#f2f2f6] hover:bg-indigo-950 hover:text-white transition-all group ${item.hoverColor}`}
            >
              <div className="flex flex-col items-center justify-center text-indigo-950 mb-1 sm:mb-2 group-hover:text-white">
                {item.icon}
              </div>
              <p className="text-[10px] xs:text-xs font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6 sm:mt-10 flex justify-center">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-1 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-indigo-950 text-white rounded-full hover:bg-indigo-900 transition-all shadow-md hover:shadow-lg disabled:opacity-70 text-sm sm:text-base"
        >
          {isLoading ? (
            <>
              <Loader size={14} className="animate-spin" />
              <span className="hidden xs:inline">Memproses...</span>
            </>
          ) : (
            <>
              <LogOut size={14} />
              <span>Logout</span>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
);
}

export default withRoleProtection(AdminProfile, ["admin"]);