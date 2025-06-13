import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loadingData, user } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!loadingData && user) {
      router.push("/dashboard");
    }
  }, [user, loadingData, router]);

  useEffect(() => {
    const msg = localStorage.getItem("loginError");
    if (msg) {
      setErrorMsg(msg);
      localStorage.removeItem("loginError");
    }
  }, []);

  const handleSignUp = () => {
    router.push("/auth/signUp");
  };

  const handleResetPassword = () => {
    router.push("/auth/resetPassword");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        { email, password }
      );

      const data = response.data;
      login(data.access_token, data.data);

      toast.success(data.message || "Login berhasil!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Terjadi kesalahan saat login";

      // toast.error(msg, { duration: 5000 });
      localStorage.setItem("loginError", msg);

      // Delay sebelum reload
      setTimeout(() => {
        router.reload();
      }, 6000); // 6 detik
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8 sm:py-0">
      <Toaster position="top-center" reverseOrder={false} />
      <AnimatePresence>
  {errorMsg && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50"
    >
      <div className="bg-red-50 border-l-4 border-red-500 p-4 shadow-lg rounded-r-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="..." clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-poppins font-medium text-red-700">
              {errorMsg}
            </p>
          </div>
          <div className="ml-auto pl-3">
            <button
              onClick={() => setErrorMsg('')}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="..." clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl shadow-md">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-white text-black">
          <h1 className="text-5xl font-calsans mb-4 text-indigo-950 font-semibold">
            MIDMANNERS
          </h1>
          <p className="text-sm text-indigo-950 font-poppins">
            Platform terpercaya untuk jual beli item game online. Transaksi
            aman, cepat, dan dengan harga terbaik di pasar.
          </p>
        </div>

        {/* Mobile Header (Only shown on mobile) */}
        <div className="md:hidden p-6 bg-white">
          <h1 className="text-3xl font-calsans text-center text-indigo-950 font-semibold">
            MIDMANNERS
          </h1>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-zinc-400 p-6 md:p-10 rounded-lg">
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <label
              htmlFor="email"
              className="text-sm font-medium text-indigo-950 font-poppins"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 rounded border border-gray-300 focus:outline-none font-poppins focus:ring-2 focus:ring-white bg-white text-black placeholder:text-gray-300"
            />
            <label
              htmlFor="password"
              className="text-sm font-medium text-indigo-950 font-poppins"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 rounded border border-gray-300 focus:outline-none font-poppins focus:ring-2 focus:ring-white bg-white text-black placeholder:text-gray-300"
            />
            <button
              type="submit"
              className={`w-full py-2 font-poppins rounded font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-950 hover:bg-indigo-900"
              } transition flex items-center justify-center gap-2`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" />
                  Proses
                </>
              ) : (
                "Login"
              )}
            </button>
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-indigo-950 font-poppins mt-2 hover:underline"
            >
              Lupa Password?
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="bg-indigo-950 text-white py-2 font-poppins rounded hover:bg-zinc-900 transition"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
