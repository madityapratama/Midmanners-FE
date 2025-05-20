"use client";

import { MoveLeft, Clock, Truck, CheckCircle, Loader, X, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type Order = {
  id: number;
  status: string;
  created_at: string;
  buyer: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
  };
  post: {
    id: number;
    title: string;
    price: string;
  };
};

export default function AktivitasViews() {
  const [activeTab, setActiveTab] = useState("menunggu");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancellingOrder, setCancellingOrder] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    { key: "menunggu", label: "Menunggu Dikirim", icon: Clock },
    { key: "terkirim", label: "Sudah Terkirim", icon: Truck },
    { key: "selesai", label: "Selesai", icon: CheckCircle },
  ];

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.some((t) => t.key === tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab("menunggu");
    }
  }, [searchParams]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      switch (activeTab) {
        case "menunggu":
          endpoint = "/orders/buyer/menungguDikirim";
          break;
        case "terkirim":
          endpoint = "/orders/buyer/sudahTerkirim";
          break;
        case "selesai":
          endpoint = "/orders/buyer/selesai";
          break;
        default:
          endpoint = "/orders/buyer/menungguDikirim";
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Gagal memuat pesanan");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const handleCancelOrder = async (orderId: number) => {
    setCancellingOrder(orderId);
    const confirmed = window.confirm("Yakin ingin membatalkan pesanan ini?");

    if(!confirmed){setCancellingOrder(null); return}  ;

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/batal`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      toast.success("Pesanan berhasil dibatalkan");
      // Refresh orders after cancellation
      await fetchOrders();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Gagal membatalkan pesanan");
    } finally {
      setCancellingOrder(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
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
          <Loader className="animate-spin text-indigo-950" />
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <div className="bg-indigo-50 p-4 rounded-lg text-center text-indigo-950 font-poppins">
          Tidak ada pesanan {tabs.find((t) => t.key === activeTab)?.label.toLowerCase()}
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
            <div className="flex justify-between text-sm">
              <span>{formatDate(order.created_at)}</span>
              <span className="font-medium capitalize">
                {order.status.toLowerCase()}
              </span>
            </div>

            <div className="flex items-center mt-3">
              <div className="w-12 h-12 bg-white border flex items-center justify-center mr-3 rounded">
                <span className="text-sm text-gray-400">📷</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{order.post.title}</div>
                <div className="text-sm">Penjual: {order.seller.name}</div>
              </div>
            </div>

            <hr className="my-3 border-gray-400" />

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <div>Total Pembelian</div>
                <div className="font-medium">{formatPrice(order.post.price)}</div>
              </div>
              
              {activeTab === "menunggu" && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  disabled={cancellingOrder === order.id}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition"
                >
                  {cancellingOrder === order.id ? (
                    <>
                      <RotateCw size={14} className="animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <X size={14} />
                      Batalkan
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/buyer/aktivitas?tab=${tab}`);
  };

  return (
    <div className="min-h-screen font-calsans bg-[#f2f2f6] p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center border-b px-4 py-3">
          <button
            className="text-indigo-950"
            onClick={() => router.push("/buyer/profil")}
            type="button"
          >
            <MoveLeft size={20} />
          </button>
          <h1 className="text-lg text-indigo-950 font-calsans ml-2">
            Riwayat Aktivitas
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