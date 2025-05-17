import ProtectedRoute from "@/components/ProtectedRoute";
import SemuaTransaksiViews from "../../views/semuaTransaksi";

const semuaTransaksiPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <SemuaTransaksiViews />
      </ProtectedRoute>
    </div>
  );
};

export default semuaTransaksiPage;
