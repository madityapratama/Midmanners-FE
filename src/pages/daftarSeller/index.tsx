import ProtectedRoute from "@/components/ProtectedRoute";
import DaftarSellerViews from "../../views/daftarSeller";

const daftarSellerPage = () => {
  return (
    <ProtectedRoute>
      <DaftarSellerViews />
    </ProtectedRoute>
  );
};

export default daftarSellerPage;
