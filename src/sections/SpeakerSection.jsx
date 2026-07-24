import { motion } from "framer-motion";
import { User } from "lucide-react";

// Speaker expertise/skill tags
const expertise = [
  "AI Agents",
  "Machine Learning",
  "LLMs",
  "Python",
  "Automation",
  "Product AI",
];

/**
 * SpeakerSection
 * Introduces the workshop speaker with a profile image placeholder,
 * short bio, and expertise badges.
 */
const SpeakerSection = () => {
  return (
    <section id="speaker" className="relative bg-[#030712] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Meet the{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Speaker
            </span>
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Learn directly from someone building real-world AI systems.
          </p>
        </motion.div>

        {/* Speaker card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur-md p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Image placeholder */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center">
              <User size={48} className="text-[#94A3B8]" />
            </div>

            {/* Details */}
            <div className="text-center sm:text-left">
              <h3 className="text-[#F8FAFC] font-semibold text-xl">
                Speaker Name
              </h3>
              <p className="text-[#3B82F6] text-sm font-medium mt-1">
                AI Engineer &amp; Industry Expert
              </p>
              <p className="mt-3 text-[#94A3B8] text-sm leading-relaxed">
                A hands-on AI practitioner with experience building intelligent
                agents and production ML systems, passionate about helping
                students translate AI theory into real, working projects.
              </p>

              {/* Expertise badges */}
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                {expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium text-[#F8FAFC] bg-white/5 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakerSection;