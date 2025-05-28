import ProtectedRoute from "@/components/ProtectedRoute";
import DaftarJualanViews from "@/views/seller/daftarJualan";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const daftarJualan = () => {
  return (
    <div>
      <ProtectedRoute>
        <DaftarJualanViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(daftarJualan,["seller"]);
