import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Workshop timeline steps, in order
const timelineSteps = [
  {
    id: "inauguration",
    title: "Workshop Inauguration",
    description:
      "Official inauguration and welcome address by the Student Guidance Cell.",
  },
  {
    id: "introduction",
    title: "Introduction to AI Agents",
    description:
      "Discover AI Agents, workshop objectives, and what you'll build.",
  },
  {
    id: "hands-on",
    title: "Hands-on AI Development",
    description:
      "Build an AI-powered application with guided practical sessions.",
  },
  {
    id: "activities",
    title: "Fun Activities & Quiz",
    description:
      "Enjoy interactive quizzes, challenges, and engaging AI activities.",
  },
  {
    id: "qa",
    title: "Interactive Q&A",
    description:
      "Ask questions and interact directly with the industry expert.",
  },
  {
    id: "conclusion",
    title: "Workshop Conclusion",
    description:
      "Closing remarks, certificate distribution, and group photograph.",
  },
];

/**
 * TimelineSection
 * Premium AI-themed workshop timeline: alternating left/right glass
 * cards around a glowing center line on desktop, a single left-aligned
 * vertical timeline on mobile.
 */
const TimelineSection = () => {
  return (
    <section id="timeline" className="relative bg-[#030712] py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial glows */}
        <div className="absolute top-1/4 -left-20 w-[26rem] h-[26rem] bg-[#3B82F6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-[26rem] h-[26rem] bg-[#8B5CF6]/10 rounded-full blur-3xl" />

        {/* Subtle animated blur blobs */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#3B82F6]/5 rounded-full blur-3xl"
        />

        {/* Dotted grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-5">
            <Sparkles size={14} className="text-[#3B82F6]" />
            <span className="text-[#94A3B8] text-xs font-medium tracking-widest uppercase">
              Workshop Flow
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Workshop{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Explore the complete EXAGENT AI journey from registration to certification.
          </p>
        </motion.div>

        {/* ===================== Mobile: single-side timeline ===================== */}
        
<div className="lg:hidden relative pl-9">
  {/* Glowing vertical line */}
  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10">
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ transformOrigin: "top" }}
      className="w-full h-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.6)]"
    />
  </div>

  <div className="flex flex-col gap-8">
    {timelineSteps.map((step, index) => {
      return (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          className="relative"
        >
          {/* Glowing Number */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-9 top-0 z-10 w-10 h-10 rounded-full p-[2px]
                       bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]
                       shadow-[0_0_18px_rgba(59,130,246,0.8),0_0_35px_rgba(139,92,246,0.7)]"
          >
            {/* Extra Glow Layer */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-md opacity-70" />

            {/* Inner Circle */}
            <div className="relative w-full h-full rounded-full bg-[#030712] flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-wider">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur-xl p-5 hover:border-[#3B82F6]/40 hover:shadow-lg hover:shadow-blue-500/10 transition-colors duration-200"
          >
            <h3 className="text-[#F8FAFC] font-semibold text-base mb-2">
              {step.title}
            </h3>

            <p className="text-[#94A3B8] text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</div>

        {/* ===================== Desktop: alternating center timeline ===================== */}
        <div className="hidden lg:block relative">
          {/* Glowing center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-white/10">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            />
          </div>

          <div className="flex flex-col gap-14">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div key={step.id} className="relative grid grid-cols-2 gap-10 items-center">
                  {/* Numbered glowing circle, centered on the line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] shadow-[0_0_18px_rgba(59,130,246,0.5)]"
                  >
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center"
                    >
                      <span className="text-[#F8FAFC] text-xs font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Left slot */}
                  <div className={`flex ${isLeft ? "justify-end pr-14" : ""}`}>
                    {isLeft && (
                      <TimelineCard
                        step={step}
                        icon={Icon}
                        direction="left"
                      />
                    )}
                  </div>

                  {/* Right slot */}
                  <div className={`flex ${!isLeft ? "justify-start pl-14" : ""}`}>
                    {!isLeft && (
                      <TimelineCard
                        step={step}
                        icon={Icon}
                        direction="right"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * TimelineCard
 * Reusable glass card for the desktop alternating timeline layout.
 * Slides in from the given direction and lifts/glows on hover.
 */
const TimelineCard = ({ step, icon: Icon, direction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur-xl p-6 hover:border-[#8B5CF6]/40 hover:shadow-xl hover:shadow-purple-500/10 transition-colors duration-200"
    >
      <h3 className="text-[#F8FAFC] font-semibold text-base mb-1.5">
        {step.title}
      </h3>
      <p className="text-[#94A3B8] text-sm leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
};

export default TimelineSection;
