import { useRouter } from "next/router";
import { ArrowLeft, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/axios"; // Sesuaikan dengan path ke service API Anda

interface SellerRequest {
  id: number;
  admin_id: number | null;
  user_id: number;
  status_account: string;
  nik: string;
  ktp: string;
  alasan: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    username: string;
    bank_accounts?: Array<{
      method: string;
      bank_name: string;
      account_number: string;
    }>;
  };
}

export default function PengajuanMenjadiSellerViews() {
  const router = useRouter();
  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerRequests = async () => {
      try {
        const response = await api.get('/admin/seller-request');
        setRequests(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data pengajuan seller');
        setLoading(false);
        // console.error('Error fetching seller requests:', err);
      }
    };

    fetchSellerRequests();
  }, []);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleDetail = (id: number) => {
    router.push(`/detailPengajuan/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 font-poppins mt-10">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={handleBack} className="text-gray-700 hover:text-black">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-semibold text-indigo-950">Pengajuan Menjadi Seller</h1>
        </div>
        <div className="text-center text-black py-10">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-6 font-poppins mt-10">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={handleBack} className="text-gray-700 hover:text-black">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-semibold text-indigo-950">Pengajuan Menjadi Seller</h1>
        </div>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 font-poppins mt-10">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="text-gray-700 hover:text-black">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-indigo-950">Pengajuan Menjadi Seller</h1>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Tidak ada pengajuan seller saat ini
        </div>
      ) : (
        <div className="bg-gray-200 rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm text-left text-indigo-950">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">NIK</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tanggal Pengajuan</th>
                <th className="px-4 py-3">Detail</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request.id} className="border-t border-gray-300">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{request.user?.name}</td>
                  <td className="px-4 py-3">{request.user?.email}</td>
                  <td className="px-4 py-3">{request.nik}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.status_account === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : request.status_account === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status_account}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(request.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDetail(request.id)}
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
      )}
    </div>
  );
}