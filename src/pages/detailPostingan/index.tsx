import ProtectedRoute from "@/components/ProtectedRoute";
import DetailPostinganViews from "../../views/detailPostingan"; // Pastikan path benar

const DetailPostinganPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <DetailPostinganViews />
      </ProtectedRoute>
    </div>
  );
};

export default DetailPostinganPage;
