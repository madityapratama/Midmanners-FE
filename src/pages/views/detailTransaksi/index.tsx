import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowLeft, ImageIcon } from "lucide-react";

export default function DetailTransaksiViews() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  // State data transaksi (agar status bisa diubah)
  const [transaksi, setTransaksi] = useState({
    namaBarang: "Nama Barang",
    kategori: "Kategori",
    buyer: "john Doe",
    seller: "Gattuso",
    noRekSeller: "735935175683",
    total: "Rp15.000",
    metode: "Dana",
    waktu: "5 Mei 2025, 17.00 WITA",
    status: "Menunggu Dana\nDikirim Oleh Midman",
  });

  // Fungsi untuk ubah status transaksi
  const handleChangeStatus = () => {
    if (transaksi.status === "Menunggu Dana\nDikirim Oleh Midman") {
      setTransaksi({
        ...transaksi,
        status: "Dana Sudah Dikirim ke Seller",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-20 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="text-gray-700 hover:text-black">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-indigo-950 font-poppins">Detail Transaksi</h1>
      </div>

      {/* Card Detail */}
      <div className="bg-gray-400 p-6 rounded-lg max-w-xl mx-auto shadow font-poppins text-indigo-950">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white p-4 rounded-md">
            <ImageIcon className="text-gray-500" size={40} />
          </div>
          <div>
            <p className="font-semibold">{transaksi.namaBarang}</p>
            <p className="text-sm text-gray-700">{transaksi.kategori}</p>
          </div>
        </div>

        <div className="text-sm text-gray-800 space-y-2">
          <div className="flex justify-between">
            <span>Nama Buyer</span>
            <span className="font-medium">{transaksi.buyer}</span>
          </div>
          <div className="flex justify-between">
            <span>Nama Seller</span>
            <span className="font-medium">{transaksi.seller}</span>
          </div>
          <div className="flex justify-between">
            <span>No Rek/ E-Wallet Seller</span>
            <span className="font-medium">{transaksi.noRekSeller}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Pesanan</span>
            <span className="font-medium">{transaksi.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Metode Pembayaran</span>
            <span className="font-medium">{transaksi.metode}</span>
          </div>
          <div className="flex justify-between">
            <span>Waktu Transaksi</span>
            <span className="font-medium">{transaksi.waktu}</span>
          </div>
          <div className="flex justify-between">
            <span>Status Transaksi</span>
            <span className="text-right font-medium whitespace-pre-line">
              {transaksi.status}
            </span>
          </div>
        </div>

        <hr className="my-6 border-gray-400" />

        <div className="text-center">
          <button
            className="bg-white border border-gray-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
            onClick={handleChangeStatus}
          >
            Ubah Status Transaksi
          </button>
        </div>
      </div>
    </div>
  );
}
