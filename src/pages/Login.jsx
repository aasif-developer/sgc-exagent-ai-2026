import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/auth/LoginForm";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#030712] pt-24">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute top-1/2 left-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-[100px]" />
        </div>

        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Welcome Back
              </h1>

              <p className="mt-3 text-slate-400">
                Sign in to access the EXAGENT AI Workshop dashboard.
              </p>
            </div>

            {/* Login Form */}
            <LoginForm />
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;