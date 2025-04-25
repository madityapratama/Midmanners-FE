import { useRouter } from 'next/router';

export default function OTPPage() {
    const router = useRouter();

    const handleCancel = () => {
      router.push('/auth/login'); // Arahkan ke halaman login
    };

    const handleNext = () => {
      router.push('/auth/newPassword');
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl font-bold mb-8 text-black">Midmanners</h1>
        <div className="bg-gray-200 rounded-lg shadow-md p-6 w-full max-w-md">
          <div className="border-b border-gray-500 pb-2 mb-4">
            <h2 className="text-lg font-medium text-black">Masukkan Kode OTP</h2>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Mohon cek pesan masuk gmail anda untuk kode OTP!
          </p>
          <div className="flex items-start gap-4 mb-4">
            <input
              type="text"
              placeholder="Masukkan Kode"
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder:text-gray-300"
            />
            <p className="text-xs text-gray-600 mt-1">
              Kami sudah mengirimkan kode, silahkan cek gmail anda!
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={handleCancel} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Batal
            </button>
            <button onClick={handleNext} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
    );
  }
  