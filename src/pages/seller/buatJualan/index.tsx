import ProtectedRoute from "@/components/ProtectedRoute";
import BuatJualanViews from "@/views/seller/buatJualan";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const buatJualanPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <BuatJualanViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(buatJualanPage,["seller"]);
