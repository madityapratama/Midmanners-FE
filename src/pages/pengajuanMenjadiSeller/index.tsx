import ProtectedRoute from "@/components/ProtectedRoute";
import PengajuanMenjadiSellerViews from "../../views/pengajuanMenjadiSeller";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const pengajuanMenjadiSellerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <PengajuanMenjadiSellerViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(pengajuanMenjadiSellerPage,["admin"]);
