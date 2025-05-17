// pages/seller/aktivitas.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Dummy data sementara, nanti diganti dengan data dari API
const data = {
  perluDiproses: [
    {
      id: 1,
      tanggal: "7 April 2025, Pukul 10.00",
      status: "Perlu Diproses",
      namaBarang: "Nama Barang",
      kategori: "Kategori",
      linkPostingan: "https://link.postingan",
      harga: "Rp. 15.000",
      sellerId: "seller1",
    },
  ],
  menungguKonfirmasi: [
    {
      id: 2,
      tanggal: "8 April 2025, Pukul 14.00",
      status: "Menunggu Konfirmasi",
      namaBarang: "Produk B",
      kategori: "Kategori B",
      linkPostingan: "https://link.produkB",
      harga: "Rp. 25.000",
      sellerId: "seller2",
    },
  ],
  pesananSelesai: [
    {
      id: 3,
      tanggal: "9 April 2025, Pukul 09.00",
      status: "Pesanan Selesai",
      namaBarang: "Produk C",
      kategori: "Kategori C",
      linkPostingan: "https://link.produkC",
      harga: "Rp. 35.000",
      sellerId: "seller3",
    },
  ],
  dibatalkan: [
    {
      id: 4,
      tanggal: "10 April 2025, Pukul 11.00",
      status: "Dibatalkan",
      namaBarang: "Produk D",
      kategori: "Kategori D",
      linkPostingan: "https://link.produkD",
      harga: "Rp. 45.000",
      sellerId: "seller4",
    },
  ],
};

export default function AktivitasViews() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("perluDiproses");

  // Cek URL query untuk tab awal (opsional, jika mau deep linking tab)
  useEffect(() => {
    const tabParam = router.query.tab;
    if (typeof tabParam === "string" && data.hasOwnProperty(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [router.query]);

  // Navigasi kembali ke halaman profil seller
  const handleBack = () => {
    router.push("/seller/profil");
  };

  // Fungsi untuk menampilkan konten berdasarkan tab aktif
  const renderContent = () => {
    const items = data[activeTab];
    if (!items || items.length === 0) {
      return <p className="text-center text-gray-500 font-poppins">Tidak ada data.</p>;
    }

    return items.map((item) => (
      <div
        key={item.id}
        className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-sm font-poppins text-indigo-950"
      >
        <div className="flex justify-between text-sm">
          <span>{item.tanggal}</span>
          <span>{item.status}</span>
        </div>

        <div className="flex mt-3 gap-4 items-center">
          <div className="w-12 h-12 bg-indigo-950 rounded-md flex items-center justify-center text-white font-bold text-sm">
            Img
          </div>
          <div>
            <p className="font-semibold">{item.namaBarang}</p>
            <p className="text-sm">{item.kategori}</p>
          </div>
        </div>

        <hr className="my-3 border-gray-400" />

        <p className="text-sm mb-1">
          Link Postingan: {" "}
          <a
            href={item.linkPostingan}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            {item.linkPostingan}
          </a>
        </p>
        <p className="font-semibold">Harga Jualan: {item.harga}</p>
      </div>
    ));
  };

  return (
    <div className="bg-white min-h-screen font-poppins text-indigo-950 px-6 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center text-indigo-950 hover:text-indigo-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Aktivitas
          </button>
        </div>

        {/* Tabs Navigasi */}
        <nav className="flex justify-between border-b border-gray-300 mb-6 text-sm">
          {[
            { key: "perluDiproses", label: "Perlu Diproses" },
            { key: "menungguKonfirmasi", label: "Menunggu Konfirmasi" },
            { key: "pesananSelesai", label: "Pesanan Selesai" },
            { key: "dibatalkan", label: "Dibatalkan" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 font-medium transition ${
                activeTab === tab.key
                  ? "border-b-2 border-indigo-950 text-indigo-950"
                  : "text-gray-600 hover:text-indigo-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Konten Utama */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}

// CATATAN UNTUK KONEKSI API:
// 1. Ganti data dummy dengan pemanggilan API menggunakan useEffect dan axios/fetch.
// 2. Contoh:
// useEffect(() => {
//   axios.get('/api/aktivitas?sellerId=...')
//     .then(res => setData(res.data))
//     .catch(err => console.error(err));
// }, []);
// 3. Kemudian isi state data berdasarkan response dari API.
