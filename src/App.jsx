import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/Admin";
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <div className="flex-1 flex flex-col">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App