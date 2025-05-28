import ProtectedRoute from "@/components/ProtectedRoute";
import ListUserViews from "../../views/listUser";
import { withRoleProtection } from "@/hoc/withRoleProtection";

const listUserPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <ListUserViews />
      </ProtectedRoute>
    </div>
  );
};

export default withRoleProtection(listUserPage,["admin","midman"]);
