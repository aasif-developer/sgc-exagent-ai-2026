import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { navLinks } from "../data/navLinks";
import sgcLogo from "../assets/logos/sgc-logo.png";
/**
 * Footer
 * Site-wide footer following the same premium dark/glass design system.
 * Reinforces branding, offers quick navigation, and closes with contact
 * details and copyright.
 */
const Footer = () => {
  const navigate = useNavigate();

  // Smooth scroll to a section by id
  const handleScrollTo = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#030712] border-t border-white/10 overflow-hidden">
      {/* Soft glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-72 h-72 bg-[#3B82F6]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -top-32 right-1/4 w-72 h-72 bg-[#8B5CF6]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8"
        >
          {/* Left Section - Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
  src={sgcLogo}
  alt="SGC Logo"
  className="w-10 h-10 object-contain"
/>
              <div className="flex flex-col leading-none">
                <span className="text-[#F8FAFC] font-semibold text-base tracking-tight">
                  SGC
                </span>
                <span className="text-[#94A3B8] text-xs">
                  Student Guidance Cell
                </span>
              </div>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              Student Guidance Cell (SGC) proudly presents EXAGENT AI, an
              exclusive AI workshop designed to empower 3rd Year students
              with practical AI knowledge and hands-on experience.
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h4 className="text-[#F8FAFC] font-semibold text-sm mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="text-[#94A3B8] hover:text-[#F8FAFC] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate("/register")}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] text-sm transition-colors duration-200"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>

          {/* Right Section - Contact */}
          <div>
            <h4 className="text-[#F8FAFC] font-semibold text-sm mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-[#94A3B8] text-sm">
                <Mail size={16} className="text-[#3B82F6] shrink-0" />
                <span>sgc@yourcollege.edu.in</span>
              </li>
              <li className="flex items-center gap-2 text-[#94A3B8] text-sm">
                <Phone size={16} className="text-[#3B82F6] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2 text-[#94A3B8] text-sm">
                <MapPin size={16} className="text-[#3B82F6] shrink-0 mt-0.5" />
                <span>Your College Name, City, State</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mt-12 mb-6 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-center sm:text-left">
          <p className="text-[#94A3B8] text-xs">
            © 2026 Student Guidance Cell. All Rights Reserved.
          </p>
          <p className="text-[#94A3B8] text-xs">
            Made with ❤️ by Student Guidance Cell.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;