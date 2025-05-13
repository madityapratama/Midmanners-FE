import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Ambil email & password dari query jika ada
  useEffect(() => {
    const queryEmail = typeof router.query.email === 'string' ? router.query.email : '';
    const queryPassword = typeof router.query.password === 'string' ? router.query.password : '';

    if (queryEmail || queryPassword) {
      setEmail(queryEmail);
      setPassword(queryPassword);
    }
  }, [router.query]);

  const handleSignUp = () => {
    router.push('/auth/signUp');
  };

  const handleResetPassword = () => {
    router.push('/auth/resetPassword');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email, // Email dari state
        password, // Password dari state
      }, {
        headers: {
          'Content-Type': 'application/json', // Pastikan header content-type adalah JSON
          'Accept': 'application/json', // Minta response dalam bentuk JSON
        },
        withCredentials: false, // Jangan kirim cookie untuk menghindari CSRF
      });
  
      // Cek apakah login sukses dan kita dapatkan access token
      if (response.status === 200) {
        const data = response.data;
  
        // Simpan token dan user data ke localStorage
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.data));
  
        toast.success('Login berhasil!');
  
        // Redirect ke dashboard setelah 1.5 detik
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        toast.error('Login gagal!');
      }
    } catch (error) {
      console.error('Login error:', error);
  
      // Tangani error saat login (misalnya jika API tidak respons atau kesalahan lainnya)
      toast.error(error.response?.data?.message || 'Terjadi kesalahan saat login');
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl shadow-md">
        {/* Kiri - Informasi Brand */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-white text-black">
          <h1 className="text-5xl font-calsans mb-4 text-indigo-950 font-semibold">MIDMANNERS</h1>
          <p className="text-sm text-indigo-950 font-poppins">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
            egestas dolor, nec dignissim metus.
          </p>
        </div>

        {/* Kanan - Form Login */}
        <div className="bg-zinc-400 p-10 rounded-lg">
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <label htmlFor="email" className="text-sm font-medium text-indigo-950 font-poppins">Email</label>
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 rounded border border-gray-300 focus:outline-none font-poppins focus:ring-2 focus:ring-white bg-white text-black placeholder:text-gray-300"
            />
             <label htmlFor="password" className="text-sm font-medium text-indigo-950 font-poppins">Password</label>
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
            className="bg-indigo-950 text-white font-poppins py-2 rounded hover:bg-zinc-900 transition"
            >
              Log In
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
