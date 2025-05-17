import ProtectedRoute from "@/components/ProtectedRoute";
import MenungguPersetujuanPostinganViews from "../../views/menungguPersetujuanPostingan";

const menungguPersetujuanPostinganPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <MenungguPersetujuanPostinganViews />
      </ProtectedRoute>
    </div>
  );
};

export default menungguPersetujuanPostinganPage;
