import { useRouter } from "next/router";
import { ArrowLeft, FileText } from "lucide-react";

interface Pengajuan {
  id: number;
  username: string;
  metode: string;
  bank: string;
  norek: string;
}

export default function PengajuanMenjadiSellerViews() {
  const router = useRouter();

  const data: Pengajuan[] = [
    {
      id: 1,
      username: "Gattuso",
      metode: "Bank",
      bank: "Mandiri",
      norek: "1284950385731",
    },
    {
      id: 2,
      username: "Gattuso",
      metode: "E-Wallet",
      bank: "Dana",
      norek: "088810045558",
    },
    {
      id: 3,
      username: "Gattuso",
      metode: "Bank",
      bank: "BCA",
      norek: "84769293494",
    },
  ];

  const handleBack = () => {
    router.push("/dashboard");
  };

  // ✅ Kirimkan ID saat klik tombol detail
  const handleDetail = (id: number) => {
    router.push(`/detailPengajuan/${id}`);
  };

  return (
    <div className="min-h-screen bg-white p-6 font-poppins mt-10">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="text-gray-700 hover:text-black">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-indigo-950">Pengajuan Menjadi Seller</h1>
      </div>

      <div className="bg-gray-200 rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-left text-indigo-950">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Username Penjual</th>
              <th className="px-4 py-3">Metode Pembayaran</th>
              <th className="px-4 py-3">Nama Bank/E-Wallet</th>
              <th className="px-4 py-3">No Rek./E-Wallet</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-300">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{item.username}</td>
                <td className="px-4 py-3">{item.metode}</td>
                <td className="px-4 py-3">{item.bank}</td>
                <td className="px-4 py-3">{item.norek}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDetail(item.id)}
                    className="text-indigo-800 hover:text-indigo-600 transition"
                    title="Lihat Detail"
                  >
                    <FileText size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
