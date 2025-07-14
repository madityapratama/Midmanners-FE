import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Loader, X, Check, Image as ImageIcon, Pencil } from "lucide-react";
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

  const [showModal, setShowModal] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/buyer/seller-request`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // Hanya angka
                if (val.length <= 16) {
                  handleChange({ target: { name: "nik", value: val } });
                }
              }}
              className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              inputMode="numeric"
              pattern="\d*"
              required
            />
          </div>

          {/* KTP Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto KTP
            </label>
            <label className="relative block w-full h-40 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 border-dashed border-gray-400">
              <input
                type="file"
                className=""
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
          <div className="flex items-center">
            <input
              id="link-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="link-checkbox"
              className="ms-2 text-sm font-medium text-black"
            >
              Saya setuju dengan{" "}
              <button
                type="button"
                onClick={()=> setShowModal(true)}
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
              syarat dan ketentuan
              </button>
              .
            </label>
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
      {showModal && (
  <div className="fixed inset-0 bg-blue-50/50  z-50 flex items-center justify-center text-black">
    <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-bold ">Syarat dan Ketentuan</h2>
      </div>
      <div className="mt-4 space-y-3 text-sm text-gray-600 max-h-64 overflow-y-auto">
        <p>1. Data harus valid dan sesuai dengan KTP asli.</p>
        <p>2. Foto KTP harus jelas dan tidak dimodifikasi.</p>
        <p>3. Data digunakan hanya untuk keperluan verifikasi internal.</p>
        <p>4. Setiap transaksi yang berhasil akan dipotong biaya midman sebesar 2% (Semakin tinggi range harga, semakin tinggi biaya midman)</p>
        <p>5. Dengan melanjutkan, Anda menyetujui syarat dan ketentuan ini.</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <a
          href="/files/snk.pdf"
          download
          className="text-sm text-indigo-700 underline"
        >
          Unduh S&K PDF
        </a>
        <button
          className="bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(false)}
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
)}

      
    </div>
  );
}
