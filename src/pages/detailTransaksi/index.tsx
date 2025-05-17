import ProtectedRoute from "@/components/ProtectedRoute";
import DetailTransaksiViews from "../../views/detailTransaksi";

const detailTransaksiPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <DetailTransaksiViews />
      </ProtectedRoute>
    </div>
  );
};

export default detailTransaksiPage;
