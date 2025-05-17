import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

export default function ListUserViews () {
    const router = useRouter();

  const users = [
    {
      id: 1,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "Bank",
      bank: "BCA",
      nomor: "029494105010",
      level: "Buyer",
    },
    {
      id: 2,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "E-Wallet",
      bank: "Dana",
      nomor: "081545598884",
      level: "Seller",
    },
    {
      id: 3,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "Bank",
      bank: "Mandiri",
      nomor: "7834895940",
      level: "Buyer",
    },
    {
      id: 4,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "Bank",
      bank: "BCA",
      nomor: "029494105010",
      level: "Buyer",
    },
    {
      id: 5,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "E-Wallet",
      bank: "Dana",
      nomor: "081545598884",
      level: "Seller",
    },
    {
      id: 6,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "Bank",
      bank: "Mandiri",
      nomor: "7834895940",
      level: "Buyer",
    },
    {
      id: 7,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "Bank",
      bank: "BCA",
      nomor: "029494105010",
      level: "Buyer",
    },
    {
      id: 8,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "E-Wallet",
      bank: "Dana",
      nomor: "081545598884",
      level: "Seller",
    },
    {
      id: 9,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "Bank",
      bank: "Mandiri",
      nomor: "7834895940",
      level: "Buyer",
    },
    {
      id: 10,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "Bank",
      bank: "BCA",
      nomor: "029494105010",
      level: "Buyer",
    },
    {
      id: 11,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "E-Wallet",
      bank: "Dana",
      nomor: "081545598884",
      level: "Seller",
    },
    {
      id: 12,
      username: "JohnDoe",
      email: "Johndoe@gmail.com",
      metode: "Bank",
      bank: "Mandiri",
      nomor: "7834895940",
      level: "Buyer",
    },
  ];

    return (
        <div className="min-h-screen bg-white p-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-gray-700 hover:text-black"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">List User</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-gray-100 text-sm text-left text-gray-700">
          <thead className="bg-gray-200 font-semibold">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Metode Pembayaran</th>
              <th className="px-4 py-3">Nama Bank/E-Wallet</th>
              <th className="px-4 py-3">No Rek/No E-Wallet</th>
              <th className="px-4 py-3">Level</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="border-t border-gray-300">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.metode}</td>
                <td className="px-4 py-2">{user.bank}</td>
                <td className="px-4 py-2">{user.nomor}</td>
                <td className="px-4 py-2">{user.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}