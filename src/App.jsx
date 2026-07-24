import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

// Temporary placeholder pages until their dedicated files are built
const LoginPlaceholder = () => <h1>Coordinator Login Coming Soon</h1>;
const DashboardPlaceholder = () => <h1>Coordinator Dashboard Coming Soon</h1>;

/**
 * App
 * Root component wiring up all application routes.
 */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPlaceholder />} />
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;