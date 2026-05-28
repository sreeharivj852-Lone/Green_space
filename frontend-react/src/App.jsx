import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";

import Plants from "./pages/Plants";
import AddPlant from "./pages/AddPlant";
import EditPlant from "./pages/EditPlant";
import Dashboard from "./pages/DashBoard";
import Orders from "./pages/Orders";
import MakeOrder from "./pages/MakeOrders";
import EditOrder from "./pages/EditOrders";
import CareSchedule from "./pages/CareSchedule";
import AddCareSchedule from "./pages/AddSchedule";
import Suppliers from "./pages/Suppliers";
import AddSupplier from "./pages/AddSupplier";
import logo from "./assets/logo.png";

const AppContent = () => {

  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate("/dashboard", { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/edit-plant/:id" element={<EditPlant />} />
          <Route path="/add-plant" element={<AddPlant />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/make-order" element={<MakeOrder />} />
          <Route path="/edit-order/:id" element={<EditOrder />} />
          <Route path="/care-schedules" element={<CareSchedule />} />
          <Route path="/add-care-schedule" element={<AddCareSchedule />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;   
