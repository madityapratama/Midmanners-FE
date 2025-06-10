import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-300 to-purple-500 flex items-center justify-center px-4 py-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-md w-full text-center transform transition-all hover:scale-[1.02] duration-300">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full animate-pulse">
            <ShieldAlert className="w-16 h-16 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3 font-sans">
          Akses Ditolak
          <span className="block w-16 h-1 bg-red-500 mx-auto mt-2 rounded-full"></span>
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. 
          Silakan hubungi administrator jika ini sebuah kesalahan.
        </p>
        
        <Link href="/landingPage">
          <span className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl active:scale-95">
            Kembali ke Beranda
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}