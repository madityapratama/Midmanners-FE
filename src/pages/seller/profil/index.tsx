import ProtectedRoute from "@/components/ProtectedRoute";
import ProfilSellerViews from "@/views/seller/profil";

const profilSellerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <ProfilSellerViews />
      </ProtectedRoute>
    </div>
  );
};

export default profilSellerPage;
