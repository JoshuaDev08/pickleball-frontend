import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sileo";
import { AuthProvider } from "./context/authContext";
import { CourtProvider } from "./context/courtContext";

function App() {
  return (
    <AuthProvider>
      <CourtProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </CourtProvider>
    </AuthProvider>
  );
}

export default App;
