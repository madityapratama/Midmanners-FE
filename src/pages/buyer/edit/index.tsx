import ProtectedRoute from "@/components/ProtectedRoute";
import EditProfilBuyerViews from "@/views/buyer/edit";

const editProfilBuyerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <EditProfilBuyerViews />
      </ProtectedRoute>
    </div>
  );
};

export default editProfilBuyerPage;
