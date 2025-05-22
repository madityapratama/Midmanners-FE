import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {Loader, X, Check, Image as ImageIcon ,Pencil} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function DaftarSellerViews() {
  const { profile, fetchProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
  });
  const [ktpImage, setKtpImage] = useState<File | null>(null);
  const [preview, setPreview] = useState({
    ktp: "",
  });

  useEffect(() => {
    // Cek jika user sudah seller
    if (profile?.role === "seller") {
      router.push("/seller/profil");
    }
  }, [profile]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "ktp" | "store_icon" | "store_cover"
  ) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview((prev) => ({
            ...prev,
            [type]: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);

      if (type === "ktp") {
        setKtpImage(file);
      }
    } else {
      toast.error("Pastikan gambar berformat .JPG/.PNG");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      
      // Append form data
      data.append("nik", formData.nik);
      
      // Append KTP image
      if (ktpImage) {
        data.append("ktp", ktpImage);
      }
    
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/buyer/seller-request`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data.nik);
      console.log(data.ktp);
      console.log(response.data);

      toast.success(response.data.message);
      // await fetchProfile();
      // router.push("/buyer/profil");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Gagal mengajukan menjadi seller";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f6] flex items-center justify-center p-4">
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <button
          onClick={() => router.push("/buyer/profil")}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-950 text-white rounded-full hover:bg-indigo-800 transition mb-6"
        >
          <X size={16} />
          Kembali
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NIK */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIK (Nomor Induk Kependudukan)
            </label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* KTP Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto KTP
            </label>
            <label className="relative block w-full h-32 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 border-dashed border-gray-400">
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={(e) => handleImageChange(e, "ktp")}
                required
              />
              {preview.ktp ? (
                <img
                  src={preview.ktp}
                  name="ktp"
                  alt="KTP"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-sm text-gray-500">
                  <ImageIcon size={24} className="mb-2" />
                  Unggah Foto KTP
                </div>
              )}
              <span className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow">
                <Pencil size={12} className="text-indigo-950" />
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Pastikan KTP terlihat jelas dan berformat .JPG/.PNG
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-full font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-950 hover:bg-indigo-900"
              } transition flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Mengajukan...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Ajukan Sekarang
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}