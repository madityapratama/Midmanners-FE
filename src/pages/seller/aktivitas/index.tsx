import ProtectedRoute from "@/components/ProtectedRoute";
import AktivitasViews from "@/views/seller/aktivitas";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const AktivitasPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <AktivitasViews />
      </ProtectedRoute>
    </div>
  );
};
export default withRoleProtection(AktivitasPage,["seller"]);
