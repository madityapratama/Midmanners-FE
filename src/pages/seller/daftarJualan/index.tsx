import ProtectedRoute from "@/components/ProtectedRoute";
import DaftarJualanViews from "@/views/seller/daftarJualan";

const daftarJualan = () => {
  return (
    <div>
      <ProtectedRoute>
        <DaftarJualanViews />
      </ProtectedRoute>
    </div>
  );
};

export default daftarJualan;
