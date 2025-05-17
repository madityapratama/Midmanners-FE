import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardViews from "../../views/dashboard"; // Pastikan path benar

const DashboardPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <DashboardViews />
      </ProtectedRoute>
    </div>
  );
};

export default DashboardPage;
