import { motion } from "framer-motion";
import {
  ClipboardList,
  Rocket,
  Code2,
  MessageCircleQuestion,
  Award,
} from "lucide-react";

// Workshop timeline steps, in order
const timelineSteps = [
  {
    id: "registration",
    icon: ClipboardList,
    title: "Registration",
    description: "Students check in and get settled before the session starts.",
  },
  {
    id: "workshop-begins",
    icon: Rocket,
    title: "Workshop Begins",
    description: "Introduction to AI Agents and the day's learning path.",
  },
  {
    id: "hands-on",
    icon: Code2,
    title: "Hands-on Session",
    description: "Build a working AI project with guided, practical steps.",
  },
  {
    id: "qa",
    icon: MessageCircleQuestion,
    title: "Q&A",
    description: "Open floor to ask the speaker anything about AI or careers.",
  },
  {
    id: "certificate",
    icon: Award,
    title: "Certificate Distribution",
    description: "Wrap up with certificates for every participant.",
  },
];

/**
 * TimelineSection
 * Shows the workshop flow as a vertical timeline on mobile and a
 * horizontal timeline on desktop.
 */
const TimelineSection = () => {
  return (
    <section id="timeline" className="relative bg-[#030712] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Workshop{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Here's how the day unfolds, from check-in to certificates.
          </p>
        </motion.div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]" />
          <div className="flex flex-col gap-8">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center">
                    <Icon size={15} className="text-[#3B82F6]" />
                  </div>
                  <h3 className="text-[#F8FAFC] font-semibold text-base">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[#94A3B8] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[19px] left-0 right-0 h-px bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]" />
          <div className="grid grid-cols-5 gap-4">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  className="flex flex-col items-start"
                >
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#3B82F6]" />
                  </div>
                  <h3 className="text-[#F8FAFC] font-semibold text-sm">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[#94A3B8] text-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;