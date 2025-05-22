import ProtectedRoute from "@/components/ProtectedRoute";
import EditProfilSellerViews from "@/views/seller/edit";

const editProfilSellerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <EditProfilSellerViews />
      </ProtectedRoute>
    </div>
  );
};

export default editProfilSellerPage;
