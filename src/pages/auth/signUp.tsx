// pages/auth/signup.js

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simpan user di localStorage
    localStorage.setItem('user', JSON.stringify(formData));

    // Arahkan ke halaman login dengan query (opsional)
    router.push({
      pathname: '/auth/login',
      query: {
        email: formData.email,
        password: formData.password
      }
    });
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-2 text-black">Midmanners</h1>
        <hr className="my-2 border-gray-500" />
        <h2 className="text-lg font-semibold mb-6">Buat Akun Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-black"
          />
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-black"
          />
          <input
            type="text"
            name="phone"
            placeholder="Nomor handphone..."
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-black"
          />

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black transition mt-4"
          >
            Daftar
          </button>
        </form>

        <button
          type="button"
          onClick={handleLogin}
          className="text-center text-sm text-gray-700 mt-2 hover:underline"
        >
          Sudah Punya Akun?
        </button>
      </div>
    </div>
  );
}
