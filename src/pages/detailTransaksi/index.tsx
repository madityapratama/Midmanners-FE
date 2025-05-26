import ProtectedRoute from "@/components/ProtectedRoute";
import DetailTransaksiViews from "../../views/detailTransaksi/[id]";

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
