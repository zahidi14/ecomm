import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Protexcted Route</h1>
      </div>
    </ProtectedRoute>
  );
}
