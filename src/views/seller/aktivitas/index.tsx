"use client";

import {
  MoveLeft,
  Clock,
  CheckCircle,
  X,
  RotateCw,
  Check,
  Truck,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";

type Order = {
  id: number;
  status: string;
  created_at: string;
  buyer: {
    id: number;
    name: string;
  };
  post: {
    id: number;
    title: string;
    price: string;
    images: string[];
  };
};

export default function AktivitasSellerViews() {
  const [activeTab, setActiveTab] = useState("perluDiproses");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingOrder, setProcessingOrder] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    { key: "perluDiproses", label: "Perlu Diproses", icon: Clock },
    { key: "menungguKonfirmasi", label: "Menunggu Konfirmasi", icon: Truck },
    { key: "selesai", label: "Selesai", icon: CheckCircle },
    { key: "batal", label: "Dibatalkan", icon: X },
  ];

  useEffect(() => {
  const tabParam = searchParams.get("tab");
  const currentTab = tabParam && tabs.some(t => t.key === tabParam)
    ? tabParam
    : "perluDiproses";

  setActiveTab(currentTab);
  fetchOrders(currentTab);
}, [searchParams]);

  const fetchOrders = async (tab) => {
    setLoading(true);
    try {
      let endpoint = "";

    switch (tab) {
      case "perluDiproses":
        endpoint = "/orders/seller/perluDiproses";
        break;
      case "menungguKonfirmasi":
        endpoint = "/orders/seller/menungguKonfirmasi";
        break;
      case "selesai":
        endpoint = "/orders/seller/selesai";
        break;
      case "batal":
        endpoint = "/orders/seller/batal";
        break;
      default:
        endpoint = "/orders/seller/perluDiproses";
    }

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);

      setOrders(response.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat pesanan");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchOrders();
  // }, [activeTab]);

  const handleProcessOrder = async (orderId: number) => {
    setProcessingOrder(orderId);
    try {
      await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/send`,
        {}
      );

      toast.success("Pesanan berhasil diproses");
      await fetchOrders();
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Gagal memproses pesanan");
    } finally {
      setProcessingOrder(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <RotateCw className="animate-spin text-indigo-950" />
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <div className="bg-indigo-50 p-4 rounded-lg text-center text-indigo-950 font-poppins">
          Tidak ada pesanan{" "}
          {tabs.find((t) => t.key === activeTab)?.label.toLowerCase()}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-indigo-950 font-poppins p-4 rounded-lg text-white"
          >
              <div className="cursor-pointer">
            <Link href={`/seller/detail/${order.post.id}`}>
                <div className="flex justify-between text-sm">
                  <span>{formatDate(order.created_at)}</span>
                  <span className="font-medium capitalize">
                    {order.status === 'dibatalkan' ? (
                      <span className="font-medium capitalize text-red-500">{order.status.toLowerCase()}</span>
                    ) : (
                      order.status.toLowerCase()
                    )}
                  </span>
                </div>

                <div className="flex items-center mt-3">
                  <div className="flex-1">
                    <div className="font-semibold">{order.post.title}</div>
                    <div className="text-sm">Pembeli: {order.buyer.name}</div>
                  </div>
                </div>

                <hr className="my-3 border-gray-400" />
            </Link>

                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <div>Total Penjualan</div>
                    <div className="font-medium">
                      {formatPrice(order.post.price)}
                    </div>
                  </div>

                  {activeTab === "perluDiproses" && (
                    <ConfirmDialog
                    onConfirm={()=> handleProcessOrder(order.id)}
                    title="Proses Pengiriman ke buyer"
                    description="Pesanan sudah diproses?"
                    confirmText="Ya, sudah diproses"
                    >
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 transition"
                    >
                      {processingOrder === order.id ? (
                        <>
                          <RotateCw size={14} className="animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Truck size={14} />
                          Proses Pesanan
                        </>
                      )}
                    </button>
                    </ConfirmDialog>
                  )}

                  {activeTab === "selesai" && (
                    order.status_dana === "perlu dikirim" ? <div className="text-sm text-red-500">
                      Belum di ditransfer
                    </div> : <div className="text-sm text-green-500">Sudah di transfer</div>
                  )}
                </div>
              </div>
          </div>
        ))}
      </div>
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab); // untuk styling
  router.push(`?tab=${tab}`, undefined, { shallow: true });
  fetchOrders(tab); // ⬅️ langsung ambil data berdasarkan tab diklik
  };

  return (
    <div className="min-h-screen font-calsans bg-[#f2f2f6] p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center border-b px-4 py-3">
          <button
            className="text-indigo-950"
            onClick={() => router.push("/seller/profil")}
            type="button"
          >
            <MoveLeft size={20} />
          </button>
          <h1 className="text-lg text-indigo-950 font-calsans ml-2">
            Aktivitas Penjualan
          </h1>
        </div>

        <div className="flex border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`flex-1 py-3 font-medium text-sm flex flex-col items-center ${
                  activeTab === tab.key
                    ? "text-indigo-950 border-b-2 border-indigo-950"
                    : "text-gray-500"
                }`}
              >
                <Icon size={18} className="mb-1" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
}