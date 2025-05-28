import ProtectedRoute from "@/components/ProtectedRoute";
import EditProfilSellerViews from "@/views/seller/edit";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const editProfilSellerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <EditProfilSellerViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(editProfilSellerPage, ["seller"]);
