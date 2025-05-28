import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Akses Ditolak</h1>
        <p className="text-gray-600 mb-6">
          Kamu tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <Link href="/">
          <span className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition">
            Kembali ke Beranda
          </span>
        </Link>
      </div>
    </div>
  );
}
