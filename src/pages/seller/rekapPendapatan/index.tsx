import ProtectedRoute from "@/components/ProtectedRoute";
import { withRoleProtection } from "@/hoc/withRoleProtection";
import api from "@/lib/axios.js"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { BarChart, LineChart, Loader2 } from 'lucide-react';
import { BarChart as ReBarChart, LineChart as ReLineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: number;
  buyer_name: string;
  post_title: string;
  status_penyerahan_dana: string;
  price: string;
  tanggal_transaksi: string;
}

interface ChartData {
  bulan: string;
  total_pendapatan: string;
}

interface ApiResponse {
  data: Transaction[];
  total_pendapatan: number;
  chart_data: ChartData[];
}

const DashboardPage = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'transactions' | 'analytics'>('transactions');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/seller/recapPendapatan');
        setApiData(response.data);
      } catch (err) {
        setError('Gagal memuat data. Silakan coba lagi.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
  };

  const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Data tidak tersedia
        </div>
      </div>
    );
  }

  // Format data untuk Recharts
  const chartData = apiData.chart_data.map(item => {
    const bulanIndex=  parseInt(item.bulan.split('-')[1]) - 1;
    return {
        bulan: namaBulan[bulanIndex],
        total_pendapatan: parseFloat(item.total_pendapatan)
    };
  });

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50 mt-16">
      <Head>
        <title>Rekap Penjualan</title>
      </Head>

      <main className="container mx-auto px-7 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Rekap Pendapatan</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Pendapatan</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {formatCurrency(apiData.total_pendapatan)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Transaksi</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{apiData.data.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Belum pencairan</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {apiData.data.filter(t => t.status_penyerahan_dana === 'perlu dikirim').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'transactions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Transaksi Terakhir
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Analisis Pendapatan
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'transactions' ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pembeli
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produk
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Pencairan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Transaksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {apiData.data.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.buyer_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.post_title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status_penyerahan_dana === 'sudah dikirim' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status_penyerahan_dana === 'perlu dikirim' ? 'belum pencairan' : 'sudah pencairan' }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(transaction.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.tanggal_transaksi)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Grafik Pendapatan Bulanan</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-md ${chartType === 'bar' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  title="Bar Chart"
                >
                  <BarChart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-md ${chartType === 'line' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  title="Line Chart"
                >
                  <LineChart className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <ReBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis 
                      tickFormatter={(value) => new Intl.NumberFormat('id-ID', { 
                        style: 'currency', 
                        currency: 'IDR',
                        maximumFractionDigits: 0 
                      }).format(value).replace('Rp', '')}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Pendapatan']}
                      labelFormatter={(label) => `Bulan ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="total_pendapatan" name="Pendapatan" fill="#3B82F6" />
                  </ReBarChart>
                ) : (
                  <ReLineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis 
                      tickFormatter={(value) => new Intl.NumberFormat('id-ID', { 
                        style: 'currency', 
                        currency: 'IDR',
                        maximumFractionDigits: 0 
                      }).format(value).replace('Rp', '')}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Pendapatan']}
                      labelFormatter={(label) => `Bulan ${label}`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="total_pendapatan" name="Pendapatan" stroke="#3B82F6" strokeWidth={2} />
                  </ReLineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
    </ProtectedRoute>
  );
};

export default withRoleProtection(DashboardPage,['seller']);