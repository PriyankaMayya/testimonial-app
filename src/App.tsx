import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import TestimonialsPage from "./pages/testimonials";
import DashboardPage from "./pages/dashboard";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<TestimonialsPage />} path="/testimonialForm" />

        <Route
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
          path="/dashboard"
        />
      </Routes>
    </>
  );
}
export default App;
