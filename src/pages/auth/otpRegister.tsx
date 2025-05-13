import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function OTPRegisterPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [email] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi kirim OTP
  const sendOtp = async (targetEmail: string) => {
    if (!targetEmail || targetEmail.trim() === '') {
      console.error('Email kosong, tidak bisa kirim OTP');
      return;
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: targetEmail }),
      });
      
      if (response.ok) {
        console.log('OTP berhasil dikirim ke:', targetEmail);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gagal kirim OTP:', response.statusText, errorData);
        setError('Gagal mengirim OTP. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Error mengirim OTP:', err);
      setError('Gagal mengirim OTP. Silakan coba lagi.');
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/resend-otp`;
      const response = await axios.post(apiUrl, { email, otp });
      
      if (response.status === 200) {
        router.push('/auth/login');
      } else {
        setError('OTP salah atau sudah kadaluarsa.');
      }
    } catch (err) {
      console.error('Verifikasi OTP gagal:', err);
      setError(err.response?.data?.message || 'Gagal verifikasi OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    await sendOtp(email);
    alert('OTP baru telah dikirim ke email Anda.');
  };

  const handleCancel = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-8 text-black">Midmanners</h1>
      <div className="bg-gray-200 rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="border-b border-gray-500 pb-2 mb-4">
          <h2 className="text-lg font-medium text-black">Masukkan Kode OTP</h2>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Mohon cek pesan masuk Gmail Anda untuk kode OTP!
        </p>

        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Masukkan Kode"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder:text-gray-300"
          />
          <p className="text-xs text-gray-600 mt-2">
            Kami telah mengirimkan kode ke <strong>{email}</strong>
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Batal
          </button>
          <button
            onClick={handleVerify}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? 'Verifikasi...' : 'Verifikasi'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOtp}
            className="text-sm text-blue-500 hover:underline"
            disabled={loading}
          >
            Kirim Ulang OTP
          </button>
        </div>
      </div>
    </div>
  );
}
