import { useRouter } from "next/router";
import { ArrowLeft, FileText, Loader, Search } from "lucide-react";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function SemuaTransaksiViews() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter((order) => {
      if (filterStatus === "all") return true;
      return order.status === filterStatus;
    })
    .filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.buyer.name.toLowerCase().includes(searchLower) ||
        order.seller.name.toLowerCase().includes(searchLower) ||
        order.post.title.toLowerCase().includes(searchLower) ||
        order.external_id.toLowerCase().includes(searchLower)
      );
    });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status) => {
    let bgColor = "bg-gray-100";
    let textColor = "text-gray-800";

    switch (status) {
      case "selesai":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        break;
      case "dibatalkan":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;
      case "perlu diproses":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        break;
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {status}
      </span>
    );
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md">
          <Loader className="animate-spin text-indigo-600 w-8 h-8" />
          <p className="text-gray-600">Loading transaction data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 bg-gray-50 p-4 md:p-8 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-full text-gray-600 hover:text-indigo-950 hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-indigo-950">
                Semua Transaksi
              </h1>
              <p className="text-gray-500">
                {orders.length} total transactions
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="border border-gray-300 text-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-indigo-950"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="selesai">Selesai</option>
              <option value="dibatalkan">Dibatalkan</option>
              <option value="perlu diproses">Perlu Diproses</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Table */}
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr className="text-indigo-950">
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Pembeli/Penjual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Produk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Dana Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order, idx) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {order.buyer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.seller.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">
                          {order.post.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatPrice(order.post.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                        {order.refund_status && (
                          <div className="text-xs text-gray-500 mt-1">
                            Refund: {order.refund_status}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.refund_status ? (
                          <div className="text-xs text-gray-500 mt-1">-</div>
                        ) : (
                          <div className="text-xsmt-1">
                            {order.status_dana}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No transactions found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search or filter"
                  : "There are currently no transactions"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
