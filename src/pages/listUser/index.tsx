import ProtectedRoute from "@/components/ProtectedRoute";
import ListUserViews from "../../views/listUser";

const listUserPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <ListUserViews />
      </ProtectedRoute>
    </div>
  );
};

export default listUserPage;
