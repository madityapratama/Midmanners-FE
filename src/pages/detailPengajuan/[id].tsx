import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Pengajuan {
  id: number;
  username: string;
  metode: string;
  bank: string;
  norek: string;
  nik: string;
  ktpUrl: string;
}

const dummyData: Pengajuan[] = [
  {
    id: 1,
    username: "Gattuso",
    metode: "Bank",
    bank: "Mandiri",
    norek: "1284950385731",
    nik: "3201123456780001",
    ktpUrl: "/ktp-sample.png",
  },
  {
    id: 2,
    username: "Gattuso",
    metode: "E-Wallet",
    bank: "Dana",
    norek: "088810045558",
    nik: "3201123456780002",
    ktpUrl: "/ktp-sample.png",
  },
  {
    id: 3,
    username: "Gattuso",
    metode: "Bank",
    bank: "BCA",
    norek: "84769293494",
    nik: "3201123456780003",
    ktpUrl: "/ktp-sample.png",
  },
];

export default function DetailPengajuan() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<Pengajuan | null>(null);

  useEffect(() => {
    if (id) {
      const detail = dummyData.find((d) => d.id === Number(id));
      setData(detail ?? null);
    }
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleSetuju = () => {
    alert("Disetujui!");
    router.push("/pengajuanMenjadiSeller");
  };

  const handleTolak = () => {
    alert("Ditolak!");
    router.push("/pengajuanMenjadiSeller");
  };

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center bg-white p-6 mt-10">
        <div className="w-full max-w-md bg-gray-400 p-6 rounded-lg shadow-md font-poppins text-indigo-950 relative">
          <button onClick={handleBack} className="absolute left-4 top-4">
            <ArrowLeft />
          </button>
          <h2 className="text-center text-xl font-semibold mb-6 mt-2">
            Detail Pengajuan Menjadi Seller
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nama User</label>
              <input
                value={data.username}
                readOnly
                className="w-full p-2 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Metode Pembayaran
              </label>
              <input
                value={data.metode}
                readOnly
                className="w-full p-2 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Nama Bank / E-Wallet
              </label>
              <input
                value={data.bank}
                readOnly
                className="w-full p-2 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                No Rek. / E-Wallet
              </label>
              <input
                value={data.norek}
                readOnly
                className="w-full p-2 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">NIK</label>
              <input
                value={data.nik}
                readOnly
                className="w-full p-2 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">KTP</label>
              <img
                src={data.ktpUrl}
                alt="Foto KTP"
                className="w-32 h-20 object-cover rounded border"
              />
            </div>
          </div>

          <hr className="my-6 border-gray-600" />

          <div className="flex justify-between">
            <button
              onClick={handleTolak}
              className="px-4 py-2 rounded bg-white border border-black hover:bg-red-100"
            >
              Tolak
            </button>
            <button
              onClick={handleSetuju}
              className="px-4 py-2 rounded bg-white border border-black hover:bg-green-100"
            >
              Setuju
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
