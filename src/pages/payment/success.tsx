import { useRouter } from 'next/router';
import { CheckCircle, ShoppingBag, Home, History } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  const router = useRouter();
  const { order_id, external_id } = router.query;

  return (
    <div className="min-h-screen bg-[#f2f2f6] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h1>
        <p className="text-gray-600 mb-6">
          Terima kasih telah melakukan pembelian. Pesanan Anda sedang diproses.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex justify-between mb-2">
            {/* <span className="text-gray-600">ID Pesanan:</span>
            <span className="font-medium">{order_id || 'N/A'}</span> */}
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ID Invoice:</span>
            <span className="font-medium text-gray-700">{external_id || 'N/A'}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Link href="/dashboard" className="w-full">
            <button className="w-full bg-indigo-950 text-white py-3 px-4 rounded-lg hover:bg-indigo-900 transition flex items-center justify-center gap-2">
              <Home size={18} />
              Kembali ke Beranda
            </button>
          </Link>
          {/* <Link href="/orders" className="w-full">
            <button className="w-full border border-indigo-950 text-indigo-950 py-3 px-4 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center gap-2">
              <History size={18} />
              Lihat Riwayat Pesanan
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}