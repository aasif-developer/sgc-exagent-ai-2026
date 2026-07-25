import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="relative bg-[#030712] py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur-xl shadow-2xl shadow-black/40 p-8 sm:p-10 flex flex-col items-center text-center"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -z-10 -top-10 -left-10 w-48 h-48 bg-[#3B82F6]/20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -z-10 -bottom-10 -right-10 w-48 h-48 bg-[#8B5CF6]/20 rounded-full blur-3xl" />

          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
            Need{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Help?
            </span>
          </h2>

          <div className="w-full h-px bg-white/10 my-7" />

          {/* Coordinators */}
          <div className="w-full">
            <p className="text-[#F8FAFC] font-semibold mb-2">
              📞 Coordinators
            </p>

            <div className="flex flex-col gap-2">
  <p className="text-[#94A3B8] text-sm">
    +91 99439 46886 — Ayaz (President)
  </p>

  <p className="text-[#94A3B8] text-sm">
    +91 95852 70647 — Aasif (Administrator)
  </p>
</div>
          </div>

          <div className="w-full h-px bg-white/10 my-7" />

          {/* Email */}
          <div className="w-full">
            <p className="text-[#F8FAFC] font-semibold mb-2">
              📧 Email
            </p>

            <p className="text-[#94A3B8] text-sm">
              contact@teamsgc.in
            </p>
          </div>

          <div className="w-full h-px bg-white/10 my-7" />

          {/* Venue */}
          <div className="w-full">
            <p className="text-[#F8FAFC] font-semibold mb-2">
              📍 Venue
            </p>

            <p className="text-[#94A3B8] text-sm">
              CAHCET Auditorium
            </p>
          </div>

          <div className="w-full h-px bg-white/10 my-7" />

          {/* Follow Us */}
          <div className="w-full">
            <p className="text-[#F8FAFC] font-semibold mb-4">
              🌐 Follow Us
            </p>

            <div className="flex justify-center gap-4">
              {/* Instagram */}
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/studentsguidancecell"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-pink-500 hover:border-pink-500/40 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm9.5 1a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/studentguidancecell-cahcet/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.9 2.7 4.9 6.3V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.8 1.9-2.8 3.8V24H8V8z" />
                </svg>
              </motion.a>

              {/* GitHub */}
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/sgc-cahcet/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-white/40 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.56v-2.16c-3.25.71-3.94-1.39-3.94-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.77 2.73 1.26 3.4.96.1-.75.4-1.26.73-1.55-2.59-.3-5.31-1.3-5.31-5.78 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.2a11.1 11.1 0 015.82 0c2.21-1.51 3.19-1.2 3.19-1.2.64 1.65.24 2.87.12 3.17.75.82 1.2 1.87 1.2 3.15 0 4.49-2.73 5.48-5.33 5.77.42.36.79 1.08.79 2.17v3.22c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;