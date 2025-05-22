import { useRouter } from 'next/router';
import { XCircle, ShoppingBag, Home, CreditCard, RotateCw } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailed() {
  const router = useRouter();
  const { order_id, error_code } = router.query;

  const errorMessages: Record<string, string> = {
    'PAYMENT_DECLINED': 'Pembayaran ditolak oleh penyedia pembayaran',
    'INSUFFICIENT_BALANCE': 'Saldo tidak mencukupi',
    'EXPIRED': 'Pembayaran kadaluarsa',
    'DEFAULT': 'Terjadi kesalahan saat memproses pembayaran'
  };

  const errorMessage = error_code 
    ? errorMessages[error_code.toString()] || errorMessages['DEFAULT']
    : errorMessages['DEFAULT'];

  return (
    <div className="min-h-screen bg-[#f2f2f6] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Gagal</h1>
        <p className="text-gray-600 mb-6">
          {errorMessage}
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex justify-between mb-2">
            {/* <span className="text-gray-600">ID Pesanan:</span>
            <span className="font-medium">{order_id || 'N/A'}</span> */}
          </div>
          {error_code && (
            <div className="flex justify-between">
              <span className="text-gray-600">Kode Error:</span>
              <span className="font-medium">{error_code}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          {/* <button
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-950 text-white py-3 px-4 rounded-lg hover:bg-indigo-900 transition flex items-center justify-center gap-2"
          >
            <RotateCw size={18} />
            Coba Lagi
          </button> */}
          <Link href="/" className="w-full">
            <button className="w-full border border-indigo-950 bg-indigo-900 text-white hover:text-indigo-900  py-3 px-4 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center gap-2">
              <Home size={18} />
              Kembali ke Beranda
            </button>
          </Link>
          {/* <Link href="/support" className="w-full">
            <button className="w-full text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2">
              <CreditCard size={18} />
              Butuh Bantuan?
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}