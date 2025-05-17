import ProtectedRoute from "@/components/ProtectedRoute";
import PengajuanMenjadiSellerViews from "../../views/pengajuanMenjadiSeller";

const pengajuanMenjadiSellerPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <PengajuanMenjadiSellerViews />
      </ProtectedRoute>
    </div>
  );
};

export default pengajuanMenjadiSellerPage;
