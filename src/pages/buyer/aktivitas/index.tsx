import ProtectedRoute from "@/components/ProtectedRoute";
import AktivitasViews from "@/views/buyer/aktivitas";
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

export default withRoleProtection(AktivitasPage, ["buyer"]);
