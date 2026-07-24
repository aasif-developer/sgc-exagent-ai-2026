import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

/**
 * ContactSection
 * Contact form UI (no submission logic yet) paired with organizer
 * contact details.
 */
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic to be wired up later (e.g. Supabase)
  };

  return (
    <section id="contact" className="relative bg-[#030712] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Have a question about the workshop? Reach out to us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur-md p-6 sm:p-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[#F8FAFC] text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#F8FAFC] text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[#F8FAFC] text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your question or message"
                className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200 resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex items-center justify-center gap-2 mt-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-[#F8FAFC] text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition-shadow duration-200"
            >
              Send Message
              <Send size={16} />
            </motion.button>
          </motion.form>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur-md p-6 sm:p-8 flex flex-col gap-6 justify-center"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center shrink-0">
                <Mail size={17} className="text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-[#F8FAFC] text-sm font-medium">Email</p>
                <p className="text-[#94A3B8] text-sm">sgc@yourcollege.edu.in</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center shrink-0">
                <Phone size={17} className="text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-[#F8FAFC] text-sm font-medium">Phone</p>
                <p className="text-[#94A3B8] text-sm">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center shrink-0">
                <MapPin size={17} className="text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-[#F8FAFC] text-sm font-medium">College</p>
                <p className="text-[#94A3B8] text-sm">
                  Your College Name, City, State
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;