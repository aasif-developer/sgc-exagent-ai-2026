import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { navLinks } from "../data/navLinks";
import sgcLogo from "../assets/logos/sgc-logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollTo = (href) => {
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#030712] border-t border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-72 h-72 bg-[#3B82F6]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -top-32 right-1/4 w-72 h-72 bg-[#8B5CF6]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={sgcLogo}
                alt="SGC Logo"
                className="w-10 h-10 object-contain"
              />

              <div className="leading-none">
                <h3 className="text-[#F8FAFC] font-semibold text-base">
                  SGC
                </h3>
                <p className="text-[#94A3B8] text-xs">
                  Student Guidance Cell
                </p>
              </div>
            </div>

            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              Student Guidance Cell (SGC) is the official student organization
at CAHCET, empowering students through workshops, technical
events, career guidance, and industry-oriented learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F8FAFC] font-semibold text-sm uppercase tracking-wide mb-4">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => navigate("/register")}
                  className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F8FAFC] font-semibold text-sm uppercase tracking-wide mb-4">
              Contact
            </h4>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[#94A3B8] text-sm">
                <Mail size={16} className="text-[#3B82F6]" />
                <span>contact@teamsgc.in</span>
              </li>

              <li className="flex items-center gap-2 text-[#94A3B8] text-sm">
                <Phone size={16} className="text-[#3B82F6]" />
                <span>+91 99439 46886</span>
              </li>

              <li className="flex items-start gap-2 text-[#94A3B8] text-sm">
                <MapPin
                  size={16}
                  className="text-[#3B82F6] mt-0.5 shrink-0"
                />
                <span>CAHCET Auditorium</span>
              </li>
            </ul>

            {/* Connect */}
<div className="mt-6">
  <h4 className="text-[#F8FAFC] font-semibold text-sm uppercase tracking-wide mb-4">
    Connect
  </h4>

  <div className="flex gap-5 flex-wrap">
  {/* Website */}
  <a
    href="https://teamsgc.in"
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-2 group"
  >
    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] group-hover:text-[#3B82F6] group-hover:border-[#3B82F6]/40 transition-all">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.93 9h-3.18a15.5 15.5 0 00-1.05-5A8.03 8.03 0 0118.93 11zM12 4c.86 1.06 1.56 3.05 1.74 5h-3.48C10.44 7.05 11.14 5.06 12 4zM4.07 13h3.18c.12 1.8.5 3.49 1.05 5A8.03 8.03 0 014.07 13zm3.18-2H4.07a8.03 8.03 0 014.23-5A15.5 15.5 0 007.25 11zm4.75 9c-.86-1.06-1.56-3.05-1.74-5h3.48c-.18 1.95-.88 3.94-1.74 5zm2.01-7H9.99a13.7 13.7 0 010-2h4.02a13.7 13.7 0 010 2zm.69 5c.55-1.51.93-3.2 1.05-5h3.18a8.03 8.03 0 01-4.23 5z" />
      </svg>
    </div>

    <span className="text-xs text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors">
      Website
    </span>
  </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/studentsguidancecell"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] group-hover:text-pink-500 group-hover:border-pink-500/40 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm9.5 1a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
        </svg>
      </div>
      <span className="text-xs text-[#94A3B8] group-hover:text-pink-500">Instagram</span>
    </a>

    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/in/studentguidancecell-cahcet/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] group-hover:text-[#3B82F6] group-hover:border-[#3B82F6]/40 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.9 2.7 4.9 6.3V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.8 1.9-2.8 3.8V24H8V8z"/>
        </svg>
      </div>
      <span className="text-xs text-[#94A3B8] group-hover:text-[#3B82F6]">LinkedIn</span>
    </a>

    {/* GitHub */}
    <a
      href="https://github.com/sgc-cahcet/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] group-hover:text-white group-hover:border-white/40 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.56v-2.16c-3.25.71-3.94-1.39-3.94-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.77 2.73 1.26 3.4.96.1-.75.4-1.26.73-1.55-2.59-.3-5.31-1.3-5.31-5.78 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.2a11.1 11.1 0 015.82 0c2.21-1.51 3.19-1.2 3.19-1.2.64 1.65.24 2.87.12 3.17.75.82 1.2 1.87 1.2 3.15 0 4.49-2.73 5.48-5.33 5.77.42.36.79 1.08.79 2.17v3.22c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
        </svg>
      </div>
      <span className="text-xs text-[#94A3B8] group-hover:text-white">GitHub</span>
    </a>
  </div>
</div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mt-12 mb-6 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[#94A3B8] text-xs">
            © 2026 Student Guidance Cell (SGC). All Rights Reserved.
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