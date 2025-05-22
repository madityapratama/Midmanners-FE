import { useRouter } from "next/router";
import { ArrowLeft, FileText } from "lucide-react";

export default function semuaTransaksiViews () {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

  const transaksi = [
    {
      id: 1,
      pembeli: "JohnDoe",
      penjual: "Gattuso",
      email: "Johndoe@gmail.com",
      total: "Rp15.300",
      status: "Menunggu Dana Dikirim",
    },
    {
      id: 2,
      pembeli: "JohnDoe",
      penjual: "Gattuso",
      email: "Johndoe@gmail.com",
      total: "Rp15.300",
      status: "Menunggu Pembayaran Buyer",
    },
    {
      id: 3,
      pembeli: "JohnDoe",
      penjual: "Gattuso",
      email: "Johndoe@gmail.com",
      total: "Rp15.300",
      status: "Menunggu Diselesaikan",
    },
  ];

    const handleBack = () => {
    router.back()
  }
    return (
          <div className="min-h-screen bg-white px-6 pt-20 pb-10 font-poppins text-indigo-950">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="text-gray-700 hover:text-black"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-poppins text-indigo-950">Semua Transaksi</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-gray-100 text-sm text-center text-gray-700 ">
          <thead className="bg-gray-200 font-semibold font-poppins text-indigo-950">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Username Pembeli</th>
              <th className="px-4 py-3">Username Penjual</th>
              <th className="px-4 py-3">Email Pembeli</th>
              <th className="px-4 py-3">Total Transaksi</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-300 ">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.pembeli}</td>
                <td className="px-4 py-2">{item.penjual}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.total}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">
                  <button className="text-indigo-950 hover:text-indigo-800">
                    <FileText size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}