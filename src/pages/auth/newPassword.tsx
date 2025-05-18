import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface FormData {
  password: string;
  password_confirmation: string;
}

export default function NewPasswordPage() {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    password_confirmation: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { token, email } = router.query; //value dari query string

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password.length < 8) {
      setError("Password harus memiliki minimal 8 karakter.");
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (!token || !email) {
      toast.error("Token atau email tidak ditemukan.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        {
          ...formData,
          token,
          email,
        }
      );
      const data = response.data;

      if (response.status == 200) {
        toast.success(
          data.message || "Password berhasil diubah! Mengarahkan ke login..."
        );
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan pada server."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl font-bold mb-8 text-black">Midmanners</h1>
      <div className="bg-gray-200 border border-black rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="border-b border-gray-800 pb-2 mb-4">
          <h2 className="text-lg font-semibold text-black">
            Pilih Password Baru!
          </h2>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Buat kata sandi baru yang panjangnya minimal 8 karakter. Kata sandi
          yang kuat memiliki kombinasi huruf, angka, dan tanda baca.
        </p>

        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password baru"
          value={formData.password}
          name="password"
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-800 focus:outline-none focus:ring-2 focus:ring-white bg-white text-black placeholder:text-gray-300 mb-2"
        />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Konfirmasi password"
          value={formData.password_confirmation}
          name="password_confirmation"
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-800 focus:outline-none focus:ring-2 focus:ring-white bg-white text-black placeholder:text-gray-300 mb-2"
        />

        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={togglePasswordVisibility}
            className="text-sm text-gray-600"
          >
            {passwordVisible ? "Sembunyikan" : "Lihat"} Password
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => router.back()}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              formData.password.length < 8 ||
              formData.password !== formData.password_confirmation
            }
            className={`px-4 py-2 rounded-md text-white ${
              formData.password.length < 8 ||
              formData.password !== formData.password_confirmation
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
