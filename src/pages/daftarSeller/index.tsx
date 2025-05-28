import ProtectedRoute from "@/components/ProtectedRoute";
import DaftarSellerViews from "../../views/daftarSeller";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const daftarSellerPage = () => {
  return (
    <ProtectedRoute>
      <DaftarSellerViews />
    </ProtectedRoute>
  );
};

export default withRoleProtection(daftarSellerPage, ["buyer"]);
