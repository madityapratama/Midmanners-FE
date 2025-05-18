import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    router.push("/auth/login");
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email tidak boleh kosong.");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`;
      const response = await axios.post(apiUrl, { email });

      if (response.status !== 200) {
        toast.error("Gagal mengirim link reset.");
        return;
      }
      
      const data = response.data;

      toast.success(data.message||"Link reset telah dikirim ke email Anda.");
      // setTimeout(() => {
      //   router.push(
      //     `/auth/reset-password/verify?email=${encodeURIComponent(email)}`
      //   );
      // }, 3000);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gagal mengirim kode reset.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-2 text-black">Midmanners</h1>
        <hr className="my-2 border-gray-500" />
        <h2 className="text-sm text-left font-semibold mb-3 text-black">
          Reset Password
        </h2>

        <p className="text-sm text-left text-gray-700 mb-3">
          Mohon masukkan email untuk mengganti password
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-gray-400"
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black transition"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black transition"
            >
              {loading ? "Mengirim..." : "Kirim Kode"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
