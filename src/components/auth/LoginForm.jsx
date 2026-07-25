import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
} from "lucide-react";

import { login, getProfile } from "../../services/auth";
import sgcLogo from "../../assets/logos/sgc-logo.png";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data, error } = await login(email, password);

      if (error) {
        setError(error.message);
        return;
      }

      if (data?.user) {
  const { data: profile, error: profileError } = await getProfile(
    data.user.id
  );

  if (profileError) {
    setError("Unable to load user profile.");
    return;
  }

  console.log(profile);

  if (profile.role === "admin") {
  navigate("/admin");
} else {
  navigate("/coordinator");
}
}
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl shadow-blue-900/20"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
          <ShieldCheck size={14} />
          Restricted Access
        </div>

        <img
          src={sgcLogo}
          alt="SGC Logo"
          className="w-16 h-16 object-contain mt-5 mb-4"
        />

        <h2 className="text-2xl font-bold text-white">
          Coordinator & Admin Portal
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
          Sign in using your assigned coordinator or administrator account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-300">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0B1120]/70 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-300">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0B1120]/70 py-3 pl-11 pr-12 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] py-3 font-semibold text-white shadow-lg shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Signing In...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Login
            </>
          )}
        </motion.button>
      </form>

      {/* Footer */}
      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-center text-sm leading-6 text-slate-500">
          This portal is intended exclusively for{" "}
          <span className="font-medium text-slate-300">
            authorized workshop coordinators and administrators.
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;