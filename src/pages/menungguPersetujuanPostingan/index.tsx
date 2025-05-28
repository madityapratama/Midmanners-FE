import ProtectedRoute from "@/components/ProtectedRoute";
import MenungguPersetujuanPostinganViews from "../../views/menungguPersetujuanPostingan";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const menungguPersetujuanPostinganPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <MenungguPersetujuanPostinganViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(menungguPersetujuanPostinganPage,["admin"]);
