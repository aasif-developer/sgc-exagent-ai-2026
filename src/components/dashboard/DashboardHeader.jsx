import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../services/auth";

const DashboardHeader = ({
  role,
  department,
  section,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const formattedRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Left Side */}
      <div>
        <p className="text-sm text-slate-400">
          Welcome back,
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          {formattedRole
            ? `${formattedRole} Dashboard`
            : "Dashboard"}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {role && (
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-300">
              {formattedRole}
            </span>
          )}

          {department && (
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-300">
              {department}
              {section ? ` - ${section}` : ""}
            </span>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-red-300 transition-all duration-200 hover:bg-red-500/20"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;