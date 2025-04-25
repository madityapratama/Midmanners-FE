import { useRouter } from 'next/router';


export default function ResetPassword() {
    const router = useRouter();

    const handleCancel = () => {
        router.push('/auth/login'); // Arahkan ke halaman login
    };

    const handleSendOtp = () => {
        router.push('/auth/otp');
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-white px-4">
        <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <h1 className="text-4xl font-bold mb-2 text-black">Midmanners</h1>
          <hr className="my-2 border-gray-500" />
          <h2 className="text-sm text-left font-semibold mb-3 text-black">Reset Password</h2>
  
          <p className="text-sm text-left text-gray-700 mb-3">
            Mohon masukkan email untuk mengganti password
          </p>
  
          <form className="space-y-4">
            <input
              type="email"
              placeholder="example@gmail.com"
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
                className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black transition"
              >
                Kirim Kode
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  