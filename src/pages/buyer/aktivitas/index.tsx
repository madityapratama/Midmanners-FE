import ProtectedRoute from "@/components/ProtectedRoute";
import AktivitasViews from "@/views/buyer/aktivitas";

const AktivitasPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <AktivitasViews />
      </ProtectedRoute>
    </div>
  );
};

export default AktivitasPage;
