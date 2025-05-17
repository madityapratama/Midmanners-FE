import ProtectedRoute from "@/components/ProtectedRoute";
import BuatJualanViews from "@/views/seller/buatJualan";

const buatJualanPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <BuatJualanViews />
      </ProtectedRoute>
    </div>
  );
};

export default buatJualanPage;
