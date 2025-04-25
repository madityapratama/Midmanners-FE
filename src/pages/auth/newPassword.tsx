import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function NewPasswordPage() {
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Gunakan useRef untuk referensi input password
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    if (password.length >= 8) {
      toast.success('Password berhasil diubah! Mengarahkan ke halaman login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }
  };

  const handlePasswordChange = () => {
    const newPassword = passwordRef.current?.value || ''; // Ambil nilai password dari ref
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setError('Password harus memiliki minimal 8 karakter.');
    } else {
      setError('');
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
          <h2 className="text-lg font-semibold text-black">Pilih Password Baru!</h2>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Buat kata sandi baru yang panjangnya minimal 8 karakter. Kata sandi yang kuat memiliki kombinasi huruf, angka, dan tanda baca.
        </p>
        <input
          styles="border"
          ref={passwordRef}
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password..."
          value={password}
          onChange={handlePasswordChange}
          required
          className="p-3 rounded border border-gray-800 focus:outline-none focus:ring-2 focus:ring-white bg-white text-black placeholder:text-gray-300"
        />

        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={togglePasswordVisibility}
            className="text-sm text-gray-600"
          >
            {passwordVisible ? 'Sembunyikan' : 'Lihat'} Password
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
            disabled={password.length < 8}
            onClick={handleNext}
            className={`px-4 py-2 rounded-md text-white ${
              password.length < 8 ? 'bg-gray-800' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
