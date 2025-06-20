import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ImageIcon,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Wallet,
} from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import Loading from "@/components/Loading";

export default function DetailTransaksiViews() {
  const router = useRouter();
  const { id } = router.query;

  // State for transaction data
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transaction data
  useEffect(() => {
    if (!id) return;

    const fetchTransaction = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setTransaction(response.data.data);
      } catch (err) {
        setError("Gagal memuat data transaksi");
        console.error("Error fetching transaction:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  // Handle status change for dana terkirim
  const handleDanaTerkirim = async () => {
    try {
      await api.patch(`/orders/${id}/midman/danaTerkirim`);
      setTransaction((prev: any) => ({
        ...prev,
        status: "selesai",
        status_dana: "sudah dikirim",
      }));
      toast.success("Data berhasil diupdate");
    } catch (err) {
      setError("Gagal mengupdate status dana terkirim");
      toast.error("Ada kesalahan,", err);
    }
  };

  // Handle status change for dana refund
  const handleDanaRefund = async () => {
    try {
      await api.patch(`/orders/${id}/midman/danaRefund`);
      setTransaction((prev: any) => ({
        ...prev,
        status: "dibatalkan",
        refund_status: "sudah refund",
      }));
      toast.success("Data berhasil diupdate");
    } catch (err) {
      setError("Gagal mengupdate status refund");
      toast.error("Ada kesalahan,", err);
    }
  };

  const handleBack = () => {
    router.push("/semuaTransaksi");
  };

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Makassar",
      }) + " WITA"
    );
  };

  // Format price to IDR
  const formatPrice = (price: string) => {
    return `Rp${parseFloat(price).toLocaleString("id-ID")}`;
  };

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "selesai":
        return {
          icon: <CheckCircle className="text-green-500" />,
          color: "text-green-600",
        };
      case "dibatalkan":
        return {
          icon: <XCircle className="text-red-500" />,
          color: "text-red-600",
        };
      case "proses":
        return {
          icon: <Clock className="text-yellow-500" />,
          color: "text-yellow-600",
        };
      default:
        return {
          icon: <AlertCircle className="text-gray-500" />,
          color: "text-gray-600",
        };
    }
  };

  if (isLoading) {
    return <Loading/>
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error</h3>
          <p className="mt-1 text-sm text-gray-500">
            {error || "Transaksi tidak ditemukan"}
          </p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(transaction.status);

  return (
    <div className="min-h-screen pt-17 mt-5 bg-gray-50 px-4 md:px-8 py-8">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-indigo-950" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-indigo-950 font-poppins">
          Detail Transaksi {transaction.external_id}
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Transaction Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div>
                <h2 className="text-lg font-bold text-indigo-950">
                  {transaction.post.title}
                </h2>
                <p className="text-lg font-semibold text-green-600 mt-1">
                  {formatPrice(transaction.post.price)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buyer Info */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                <Wallet className="text-indigo-500" size={18} />
                Informasi Pembeli
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama</span>
                  <span className="font-medium text-black">
                    {transaction.buyer.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Metode Pembayaran</span>
                  <span className="font-medium text-black ">
                    {transaction.buyer.akun_bank}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Rekening/EWallet</span>
                  <span className="font-medium text-black">
                    {transaction.buyer.no_rek}
                  </span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                <Wallet className="text-indigo-500" size={18} />
                Informasi Penjual
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama</span>
                  <span className="font-medium text-black">
                    {transaction.seller.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Metode Pembayaran</span>
                  <span className="font-medium text-black">
                    {transaction.seller.akun_bank}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Rekening/EWallet</span>
                  <span className="font-medium text-black">
                    {transaction.seller.no_rek}
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="text-indigo-500" size={18} />
                Informasi Transaksi
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Waktu Transaksi</span>
                  <span className="font-medium text-black">
                    {formatDate(transaction.created_at)}
                  </span>
                </div>
                {transaction.completed_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu Selesai</span>
                    <span className="font-medium text-black">
                      {formatDate(transaction.completed_at)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`font-medium flex items-center gap-1 ${statusInfo.color}`}
                  >
                    {statusInfo.icon}
                    {transaction.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status Dana</span>
                  <span className="font-medium">
                    {transaction.status_dana === "sudah dikirim" ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle size={16} />
                        Dana sudah dikirim
                      </span>
                    ) : (
                      <span className="text-yellow-600 flex items-center gap-1">
                        <Clock size={16} />
                        {transaction.status_dana}
                      </span>
                    )}
                  </span>
                </div>
                {transaction.refund_status && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status Refund</span>
                    <span className="font-medium">
                      {transaction.refund_status === "sudah refund" ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle size={16} />
                          Sudah refund
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle size={16} />
                          {transaction.refund_status}
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {transaction.status_dana === "perlu dikirim" && (
            <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <ConfirmDialog
                onConfirm={handleDanaTerkirim}
                title="Kirim dana ke seller"
                description="Dana sudah di kirim?"
                confirmText="Ya, konfirmasi pengiriman dana"
              >
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none flex-1 flex items-center justify-center gap-2"
                  disabled={transaction.status_dana === "sudah dikirim"}
                >
                  <CheckCircle size={18} />
                  Konfirmasi Dana Terkirim ke Seller
                </button>
              </ConfirmDialog>
            </div>
          )}
          {transaction.refund_status === "belum refund" && (
            <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <ConfirmDialog
                onConfirm={handleDanaRefund}
                title="Refund dana ke buyer"
                description="Dana sudah di refund?"
                confirmText="Ya, konfirmasi pengembalian dana"
              >
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none flex-1 flex items-center justify-center gap-2"
                  disabled={transaction.refund_status === "sudah refund"}
                >
                  <XCircle size={18} />
                  Konfirmasi Dana Refund ke Buyer
                </button>
              </ConfirmDialog>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
