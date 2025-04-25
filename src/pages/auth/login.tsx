import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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

  const handleLogin = () => {
  let storedUser = null;
  try {
    const userData = localStorage.getItem('user');
    storedUser = userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error('Gagal membaca data dari localStorage:', err);
  }

  if (
    storedUser &&
    storedUser.email === email &&
    storedUser.password === password
  ) {
    toast.success('Login berhasil!', {
      duration: 2000,
    });

    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  } else {
    toast.error('Email atau password salah');
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl shadow-md">
        {/* Kiri - Informasi Brand */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-white text-black">
          <h1 className="text-5xl font-bold mb-4">Midmanners</h1>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
            egestas dolor, nec dignissim metus.
          </p>
        </div>

        {/* Kanan - Form Login */}
        <div className="bg-gray-200 p-10 rounded-lg">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-white text-black placeholder:text-gray-300"
            />
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-white text-black placeholder:text-gray-300"
            />
            <button
              type="button"
              onClick={handleLogin}
              className="bg-gray-800 text-white py-2 rounded hover:bg-black transition"
            >
              Log In
            </button>

            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-gray-700 mt-2 hover:underline"
            >
              Lupa Password?
            </button>

            <button
              type="button"
              onClick={handleSignUp}
              className="bg-gray-800 text-white py-2 rounded hover:bg-black transition"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
