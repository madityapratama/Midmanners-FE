import ProtectedRoute from "@/components/ProtectedRoute";
import EditProfilBuyerViews from "@/views/buyer/edit";
import { withRoleProtection } from "@/hoc/withRoleProtection";


const editProfilBuyerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <EditProfilBuyerViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(editProfilBuyerPage, ["buyer"]);
