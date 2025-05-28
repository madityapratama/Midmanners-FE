import ProtectedRoute from "@/components/ProtectedRoute";
import SemuaTransaksiViews from "../../views/semuaTransaksi";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const semuaTransaksiPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <SemuaTransaksiViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(semuaTransaksiPage,["admin","midman"]);
