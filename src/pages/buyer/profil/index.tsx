import ProtectedRoute from "@/components/ProtectedRoute";
import ProfilBuyerViews from "@/views/buyer/profil";
import {withRoleProtection} from "@/hoc/withRoleProtection";

const ProfilBuyerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <ProfilBuyerViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(ProfilBuyerPage, ["buyer"]);
