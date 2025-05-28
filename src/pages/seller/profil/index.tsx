import ProtectedRoute from "@/components/ProtectedRoute";
import ProfilSellerViews from "@/views/seller/profil/SellerProfile";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const profilSellerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <ProfilSellerViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(profilSellerPage,["seller"]);
