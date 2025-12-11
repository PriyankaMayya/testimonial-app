import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import TestimonialsPage from "./pages/testimonials";
import DashboardPage from "./pages/dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<TestimonialsPage />} path="/testimonialForm" />

        <Route element={<DashboardPage />} path="/dashboard" />
      </Routes>
    </>
  );
}
export default App;
