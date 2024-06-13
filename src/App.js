import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import Officer from "./pages/Officer";
import CreateOrderItems from "./pages/Officer/create";
import Manager from "./pages/Manager";
import Finance from "./pages/Finance";
import { listen } from "./redux/listener";
import { useEffect } from "react";
import DetailFormManager from "./pages/Manager/Detail";
import DetailFormFinance from "./pages/Finance/Detail";
import DetailFormOfficer from "./pages/Officer/Detail";

function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/officer" element={<Officer />} />
        <Route path="/create-order-items" element={<CreateOrderItems />} />
        <Route path="/detail-form-officer/:id" element={<DetailFormOfficer />} />
        <Route path="/manager" element={<Manager />} />
        <Route
          path="/detail-form-manager/:id"
          element={<DetailFormManager />}
        />
        <Route path="/finance" element={<Finance />} />
        <Route
          path="/detail-form-finance/:id"
          element={<DetailFormFinance />}
        />
      </Routes>
    </>
  );
}

export default App;
