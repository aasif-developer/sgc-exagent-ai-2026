import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "../data/navLinks";
import sgcLogo from "../assets/logos/sgc-logo.png";
/**
 * Navbar
 * Sticky, glassmorphic navigation bar with smooth-scroll section links
 * and route-based CTA buttons. Fully responsive (mobile-first).
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
const isLoginPage = location.pathname === "/login";
  // Track scroll position to intensify the glass/blur effect once scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu (used after any nav action)
  const closeMenu = () => setIsOpen(false);

  // Smooth scroll to a section by id, then close mobile menu
  const handleScrollTo = (href) => {
  closeMenu();

  // Home button
  if (href === "/") {
    navigate("/");
    return;
  }

  // If we're not on the Home page, navigate there first
  if (location.pathname !== "/") {
    navigate("/", {
      state: { scrollTo: href },
    });
    return;
  }

  setTimeout(() => {
    const target = document.querySelector(href);

    if (target) {
      const navbarHeight = 80;

      window.scrollTo({
        top: target.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
  }, 300);
};

  // Navigate to a route (for CTA buttons), then close mobile menu
  const handleNavigate = (path) => {
    closeMenu();
    navigate(path);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border-b border-white/10"
          : "bg-[#030712]/40 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-20">
          {/* Logo + Branding */}
<Link
  to="/"
  onClick={closeMenu}
  className="flex items-center gap-3 shrink-0"
>
  <img
    src={sgcLogo}
    alt="SGC Logo"
    className="w-11 h-11 md:w-12 md:h-12 object-contain"
  />

  <div className="flex flex-col justify-center">
    <span className="text-white text-xl md:text-2xl font-bold leading-none tracking-tight">
      SGC
    </span>

    <span className="mt-1.5 text-slate-400 text-[11px] md:text-xs leading-tight mt-0.5">
      Student Guidance Cell
    </span>
  </div>
</Link>

{/* Desktop Navigation */}
<nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
  {navLinks.map((link) => (
    <button
      key={link.id}
      onClick={() => handleScrollTo(link.href)}
      className="relative text-[#94A3B8] hover:text-white text-sm font-medium transition-colors duration-200 group"
    >
      {link.label}

      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
    </button>
  ))}
</nav>

{/* Desktop Action Buttons */}
<div className="hidden md:flex items-center gap-3">
  {/* Login: hidden only on /login */}
  {!isLoginPage && (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => handleNavigate("/login")}
      className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
    >
      Login
    </motion.button>
  )}

  {/* Register: hidden only on /register */}
  {!isRegisterPage && (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => handleNavigate("/register")}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
    >
      Register
      <ArrowRight size={16} />
    </motion.button>
  )}
</div>

          {/* Mobile Hamburger Trigger */}
          {/* Mobile Actions */}
<div className="flex items-center gap-2 md:hidden">
  {/* Mobile Register: hidden only on /register */}
  {!isRegisterPage && (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={() => handleNavigate("/register")}
    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-xs font-semibold"
  >
    Register
    <ArrowRight size={14} />
  </motion.button>
)}

  <button
    onClick={() => setIsOpen((prev) => !prev)}
    className="text-[#F8FAFC] p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
    aria-label="Toggle navigation menu"
    aria-expanded={isOpen}
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#030712]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="flex flex-col px-4 sm:px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.href)}
                  className="text-left text-[#94A3B8] hover:text-[#F8FAFC] text-base font-medium py-3 border-b border-white/5 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}

              {/* Mobile menu Login: hidden only on /login */}
              {!isLoginPage && (
                <button
                  onClick={() => handleNavigate("/login")}
                  className="text-left text-[#F8FAFC] text-base font-medium py-3 border-b border-white/5 transition-colors duration-200"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;