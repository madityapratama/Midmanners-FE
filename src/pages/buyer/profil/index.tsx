import ProtectedRoute from "@/components/ProtectedRoute";
import ProfilBuyerViews from "@/views/buyer/profil";

const ProfilBuyerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <ProfilBuyerViews />
      </ProtectedRoute>
    </div>
  );
};

export default ProfilBuyerPage;
