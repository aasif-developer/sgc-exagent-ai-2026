import { motion } from "framer-motion";
import { Target, GraduationCap } from "lucide-react";

// Objectives listed for the workshop
const objectives = [
  "Introduce core concepts behind AI Agents and how they operate.",
  "Demonstrate practical use of modern AI tools and frameworks.",
  "Guide students through building a small working AI project.",
  "Bridge the gap between classroom theory and real-world AI application.",
];

// Learning outcomes for attendees
const outcomes = [
  "Understand how AI Agents reason, plan, and execute tasks.",
  "Gain hands-on experience with real AI development workflows.",
  "Build confidence to explore AI further, independently.",
  "Walk away with a project and certificate to showcase.",
];

/**
 * AboutWorkshop
 * Explains what the workshop covers, its objectives, and the outcomes
 * students can expect — presented as two complementary cards.
 */
const AboutWorkshop = () => {
  return (
    <section id="about" className="relative bg-[#030712] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            About the{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Workshop
            </span>
          </h2>
          <p className="mt-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            EXAGENT AI is a focused, hands-on workshop designed to introduce
            3rd Year students to the fundamentals of AI Agents and modern AI
            technologies. Rather than passive lectures, the session
            prioritizes practical building — helping students move from
            understanding concepts to applying them.
          </p>
        </motion.div>

        {/* Objectives + Outcomes cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-[#111827]/60 backdrop-blur-md p-6 sm:p-7"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center">
                <Target size={18} className="text-[#3B82F6]" />
              </div>
              <h3 className="text-[#F8FAFC] font-semibold text-lg">
                Objectives
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {objectives.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-[#94A3B8] text-sm leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-[#111827]/60 backdrop-blur-md p-6 sm:p-7"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center">
                <GraduationCap size={18} className="text-[#8B5CF6]" />
              </div>
              <h3 className="text-[#F8FAFC] font-semibold text-lg">
                Learning Outcomes
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {outcomes.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-[#94A3B8] text-sm leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutWorkshop;