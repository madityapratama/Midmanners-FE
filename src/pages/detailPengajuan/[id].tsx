import { useRouter } from "next/router";
import { ArrowLeft, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/axios";
import Image from "next/image";

interface Pengajuan {
  id: number;
  username: string;
  metode: string;
  bank: string;
  norek: string;
  nik: string;
  ktpUrl: string;
  status?: string;
}

export default function DetailPengajuan() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<Pengajuan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Ganti dengan API call sebenarnya
    const fetchData = async () => {
      try {
        setLoading(true);
        // Contoh: const response = await api.get(`/admin/seller-request/${id}`);
        const response = await api.get(`/admin/seller-request/${id}`);

        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

   fetchData();
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleSetuju = async (id) => {
    if(!confirm('Yakin ingin menyetujui pengajuan ini?')) return;
    setIsSubmitting(true);
    try {
       const response=  await api.post(`/admin/seller-request/${id}/approve`);
      alert(response.data.message || "Pengajuan berhasil disetujui!");
      router.push("/pengajuanMenjadiSeller");
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Gagal menyetujui pengajuan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTolak = async (id) => {
    if (!rejectionReason) {
      alert("Harap masukkan alasan penolakan");
      return;
    }

    if(!confirm('Yakin ingin menolak pengajuan ini?')) return;

    setIsSubmitting(true);
    try {
      const response =  await api.post(`/admin/seller-request/${id}/reject`, { alasan: rejectionReason });
      alert(response.data.message || "Pengajuan berhasil ditolak!");
      router.push("/pengajuanMenjadiSeller");
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Gagal menolak pengajuan");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !data) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-3 text-indigo-950">Memuat detail pengajuan...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Kembali ke Daftar Pengajuan
          </button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-indigo-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Detail Pengajuan Seller
              </h2>
              {data.status && (
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    data.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : data.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.status}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama User
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-black border-gray-200">
                      {data.user.name}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Metode Pembayaran
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-black border-gray-200">
                      {data.user.jenis_pembayaran}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Bank / E-Wallet
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-black border-gray-200">
                      {data.user.akun_bank}
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No Rekening / E-Wallet
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-black border-gray-200">
                      {data.user.no_rek}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIK
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-black border-gray-200">
                      {data.nik}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Foto KTP
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center">
                      <div className="mt-2">
                        <div
                          onClick={() => setIsZoomed(true)}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}${data.ktp}`}
                            alt="Foto KTP"
                            width={300}
                            height={200}
                            className="rounded-md border border-gray-300 object-contain"
                            style={{ maxHeight: "200px" }}
                          />
                          <p className="mt-1 text-xs text-gray-500 text-center">
                            Klik gambar untuk memperbesar
                          </p>
                        </div>
                      </div>

                      {/* Lightbox/Modal untuk zoom */}
                      {isZoomed && (
                        <div
                          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                          onClick={() => setIsZoomed(false)}
                        >
                          <div className="relative max-w-4xl w-full max-h-[90vh]">
                            <button
                              onClick={() => setIsZoomed(false)}
                              className="absolute -top-10 right-0 text-white hover:text-gray-300"
                            >
                              <X size={24} />{" "}
                              {/* Pastikan import X dari lucide-react */}
                            </button>
                            <div className="h-full w-full flex justify-center">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_IMG_URL}${data.ktp}`}
                                alt="Foto KTP (Zoom)"
                                width={800}
                                height={600}
                                className="object-contain max-h-[80vh]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

  {/* Form Alasan Penolakan */}
  
  {data.status_account !== "accepted" && (
    <>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alasan Penolakan (jika ditolak)
        </label>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Masukkan alasan penolakan..."
          rows={3}
          className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={() => handleTolak(data?.id)}
          disabled={isSubmitting}
          className="flex items-center justify-center px-5 py-2.5 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <X className="mr-2" size={18} />
          {isSubmitting ? "Memproses..." : "Tolak Pengajuan"}
        </button>
        <button
          onClick={() => handleSetuju(data?.id)}
          disabled={isSubmitting}
          className="flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <Check className="mr-2" size={18} />
          {isSubmitting ? "Memproses..." : "Setujui Pengajuan"}
        </button>
      </div>
    </>
  )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
