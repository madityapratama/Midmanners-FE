import { useRouter } from "next/router";
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function PaymentSuccess() {
  const router = useRouter();
  const { order_id, external_id } = router.query;
  const [nota, setNota] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!external_id) return;

    const fetchNota = async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/nota?external_id=${external_id}`
        );
        setNota(response.data.nota);
      } catch (error) {
        console.error("Gagal mengambil nota:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNota();
  }, [external_id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  

  return (
    <div className="min-h-screen bg-[#f2f2f6] flex items-center justify-center p-4">
      <div  className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pembayaran Berhasil!
        </h1>
        <p className="text-gray-600 mb-6">
          Terima kasih telah melakukan pembelian. Pesanan Anda sedang diproses.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h2 className="text-xl font-bold mb-4 text-center text-black">Nota Transaksi</h2>
          
          {loading ? (
            <p className="text-center py-4 text-black">Memuat data nota...</p>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ID Transaksi:</span>
                <span className="font-medium text-black">{nota?.external_id || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">{nota?.status || "Berhasil"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pembeli:</span>
                <span className="font-medium text-black">{nota?.buyer_name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Penjual:</span>
                <span className="font-medium text-black">{nota?.seller_name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Produk:</span>
                <span className="font-medium text-black">{nota?.post_title.length > 40 ? nota?.post_title.substring(0,40) + '...' : nota?.post_title || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Harga:</span>
                <span className="font-medium text-black"> {formatPrice(nota?.price) || "0"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal:</span>
                <span className="font-medium text-black">
                  {new Date(nota?.crated_at || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
          
          <button
            onClick={() => window.print()}
            className=" print:hidden mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Cetak Nota
          </button>
        </div>

        <div className="flex flex-col space-y-3 print:hidden">
          <Link href="/dashboard" className="w-full">
            <button className="w-full bg-indigo-950 text-white py-3 px-4 rounded-lg hover:bg-indigo-900 transition flex items-center justify-center gap-2">
              <Home size={18} />
              Kembali ke Beranda
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}