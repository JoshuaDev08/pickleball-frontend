import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sileo";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
