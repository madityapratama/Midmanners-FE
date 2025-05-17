"use client";

import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // pakai next/navigation
import { useSearchParams } from "next/navigation"; // untuk membaca query tab

export default function AktivitasViews() {
  const [activeTab, setActiveTab] = useState("menunggu");
  const router = useRouter();
  const searchParams = useSearchParams(); // baca search params

  const tabs = [
    { key: "menunggu", label: "Menunggu Dikirim" },
    { key: "terkirim", label: "Sudah Terkirim" },
    { key: "selesai", label: "Selesai" },
  ];

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.some(t => t.key === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]); // jalan setiap searchParams berubah

  const renderContent = () => {
    switch (activeTab) {
      case "menunggu":
        return (
          <div className="bg-indigo-950 font-poppins p-4 rounded-lg">
            <div className="flex justify-between text-sm text-white">
              <span>7 April 2025, Pukul 10.00</span>
              <span className="font-medium">Menunggu Dikirim</span>
            </div>

            <div className="flex items-center mt-3">
              <div className="w-12 h-12 bg-white border flex items-center justify-center mr-3">
                <span className="text-sm text-gray-400">📷</span>
              </div>
              <div>
                <div className="font-semibold text-white">Nama Barang</div>
                <div className="text-sm text-white">Kategori</div>
              </div>
            </div>

            <hr className="my-3 border-gray-400" />

            <div className="text-sm">
              <div className="text-white">Total Pembelian</div>
              <div className="font-medium text-white">Rp. 15.000</div>
            </div>
          </div>
        );
      case "terkirim":
        return (
          <div className="bg-indigo-950 p-4 rounded-lg font-poppins font-semibold text-white text-center">
            Belum ada pesanan terkirim.
          </div>
        );
      case "selesai":
        return (
          <div className="bg-indigo-950 p-4 rounded-lg text-white font-poppins font-semibold text-center">
            Belum ada pesanan selesai.
          </div>
        );
      default:
        return null;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/buyer/aktivitas?tab=${tab}`); // update URL juga
  };

  return (
    <div className="min-h-screen font-calsans bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-md">
        <div className="flex items-center border-b px-4 py-2">
          <button
            className="text-black"
            onClick={() => router.push("/buyer/profil")}
            type="button"
          >
            <MoveLeft />
          </button>
          <h1 className="text-lg text-indigo-950 font-calsans ml-2">Riwayat Aktivitas</h1>
        </div>

        <div className="flex justify-around border-b text-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex-1 py-3 font-medium ${
                activeTab === tab.key ? "border-b-2 border-black text-indigo-950" : "text-indigo-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
}
