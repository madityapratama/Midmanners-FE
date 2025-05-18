import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handler perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi awal
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.password_confirmation
    ) {
      toast.error("Semua field harus diisi!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password minimal 8 karakter!");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      toast.error("Password dan konfirmasi tidak cocok!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Perbaikan: Menghapus tipe AxiosResponse
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        formData
      );
      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        toast.success(
          data.message || "Pendaftaran berhasil! Silakan verifikasi email.",
          {
            style: {
              border: "1px solid #1e1b4b",
              padding: "16px",
              color: "#1e1b4b",
              backgroundColor: "#e0e7ff",
              fontFamily: "Poppins, sans-serif",
            },
            iconTheme: {
              primary: "#1e1b4b",
              secondary: "#ffffff",
            },
          }
        );

        
        setTimeout(() => {
          router.push({
            pathname: "/auth/otpRegister",
            query: { email: formData.email },
          });
        }, 1000);
      }
    } catch (error) {
      console.error("Error saat registrasi:", error);
      const msg =
        error.response?.data?.message ||
        "Terjadi kesalahan. Silakan coba lagi.";
      toast.error(msg, {
        style: {
          border: "1px solid #1e1b4b",
          padding: "16px",
          color: "#fff",
          backgroundColor: "#dc2626",
          fontFamily: "Poppins, sans-serif",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#dc2626",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-zinc-400 rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold font-calsans mb-2 text-indigo-950">
          MIDMANNERS
        </h1>
        <hr className="my-2 border-indigo-950" />
        <h2 className="text-lg text-indigo-950 font-semibold mb-6 font-poppins">
          Buat Akun Baru
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nama"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded border font-poppins border-indigo-950 focus:outline-none focus:ring-2 focus:ring-black text-indigo-950 placeholder:text-zinc-350"
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded border font-poppins border-indigo-950 focus:outline-none focus:ring-2 focus:ring-black text-indigo-950 placeholder:text-zinc-350"
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded border font-poppins border-indigo-950 focus:outline-none focus:ring-2 focus:ring-black text-indigo-950 placeholder:text-zinc-350"
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Konfirmasi Password..."
            required
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full p-3 rounded border font-poppins border-indigo-950 focus:outline-none focus:ring-2 focus:ring-black text-indigo-950 placeholder:text-zinc-350"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-950 font-poppins text-white py-2 rounded hover:bg-zinc-900 transition mt-4"
          >
            {isSubmitting ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="text-center text-sm text-indigo-950 font-poppins mt-2 hover:underline"
        >
          Sudah punya akun?
        </button>
      </div>
    </div>
  );
}
