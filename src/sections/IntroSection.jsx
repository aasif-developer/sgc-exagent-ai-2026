import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Box, Paperclip, ArrowDown, ChevronDown, Sparkles } from "lucide-react";

// Thin vertical light beams — position, height, opacity and blur vary
// so the group reads as an irregular light curtain.
const lightBeams = [
  { left: "6%", height: "65%", opacity: 0.12, delay: 0, duration: 8, color: "#3B82F6" },
  { left: "16%", height: "50%", opacity: 0.08, delay: 0.6, duration: 9, color: "#8B5CF6" },
  { left: "26%", height: "75%", opacity: 0.15, delay: 1.2, duration: 7.5, color: "#F8FAFC" },
  { left: "37%", height: "55%", opacity: 0.1, delay: 0.3, duration: 8.5, color: "#3B82F6" },
  { left: "50%", height: "45%", opacity: 0.07, delay: 1.8, duration: 10, color: "#8B5CF6" },
  { left: "63%", height: "70%", opacity: 0.13, delay: 0.9, duration: 8, color: "#3B82F6" },
  { left: "74%", height: "52%", opacity: 0.09, delay: 1.5, duration: 9.5, color: "#F8FAFC" },
  { left: "84%", height: "62%", opacity: 0.12, delay: 0.4, duration: 7, color: "#8B5CF6" },
  { left: "94%", height: "48%", opacity: 0.08, delay: 1.1, duration: 8.8, color: "#3B82F6" },
];

// Slow, low-opacity ambient particles drifting across the background
const particles = [
  { top: "20%", left: "18%", size: 3, delay: 0, color: "#8B5CF6" },
  { top: "65%", left: "82%", size: 4, delay: 1.4, color: "#3B82F6" },
  { top: "35%", left: "72%", size: 3, delay: 0.8, color: "#8B5CF6" },
  { top: "78%", left: "20%", size: 3, delay: 2, color: "#3B82F6" },
  { top: "12%", left: "45%", size: 4, delay: 0.5, color: "#F8FAFC" },
  { top: "50%", left: "10%", size: 3, delay: 1.8, color: "#8B5CF6" },
  { top: "85%", left: "60%", size: 4, delay: 1.1, color: "#3B82F6" },
  { top: "42%", left: "90%", size: 3, delay: 2.3, color: "#8B5CF6" },
  { top: "8%", left: "80%", size: 3, delay: 0.9, color: "#F8FAFC" },
];

// Small dots that orbit continuously around the mascot
const orbitDots = [
  { angle: 0, radius: 78, size: 8, color: "#3B82F6", duration: 4 },
  { angle: 120, radius: 78, size: 7, color: "#8B5CF6", duration: 4 },
  { angle: 240, radius: 78, size: 7, color: "#F8FAFC", duration: 4 },
];

/**
 * IntroSection
 * Chat-style opener that sits above HeroSection. A floating AI mascot,
 * headline, and a glassmorphism "AI chat bar" (Build pill, attachment,
 * send button), set against an animated blue/purple light-beam
 * background matching the site's theme. HeroSection follows immediately
 * after the chat bar, with no extra scroll cue in between.
 */
const IntroSection = () => {
  const sectionRef = useRef(null);

  // Mouse parallax — background layers drift a few px toward the cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, {
  stiffness: 35,
  damping: 30,
  mass: 1,
});

const smoothY = useSpring(mouseY, {
  stiffness: 35,
  damping: 30,
  mass: 1,
});
  const beamsX = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
const beamsY = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#030712] px-4 pt-28 pb-14"
    >
      {/* ================= Background ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Radial glows */}
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-[#3B82F6]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[26rem] h-[26rem] bg-[#8B5CF6]/20 rounded-full blur-3xl"
        />

        {/* Vertical light beams */}
        <motion.div style={{ x: beamsX, y: beamsY }} className="absolute inset-0">
          {lightBeams.map((beam, index) => (
            <motion.div
              key={index}
              className="absolute top-0 rounded-full blur-md"
              style={{
                left: beam.left,
                width: "2px",
                height: beam.height,
                background: `linear-gradient(to bottom, transparent, ${beam.color}, transparent)`,
                opacity: beam.opacity,
              }}
              animate={{
                y: ["-4%", "4%", "-4%"],
                opacity: [beam.opacity * 0.6, beam.opacity, beam.opacity * 0.6],
              }}
              transition={{
                duration: beam.duration,
                delay: beam.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Ambient particles */}
        {particles.map((p, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 8px 2px ${p.color}99`,
            }}
            animate={{
              y: [0, -22, 0],
              x: [0, index % 2 === 0 ? 10 : -10, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4.5 + index * 0.5,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {/* =============== End Background =============== */}

      {/* AI mascot — floating, animated, with particles orbiting around it */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-32 sm:w-40 mb-2"
      >
        {/* Glow behind the mascot */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#3B82F6]/30 to-[#8B5CF6]/30 blur-3xl rounded-full scale-110" />

        {/* Orbiting glow dots */}
        {orbitDots.map((dot, index) => (
          <motion.div
            key={index}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10"
            style={{ width: 0, height: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.4,
            }}
          >
            <span
              className="absolute rounded-full"
              style={{
                width: dot.size,
                height: dot.size,
                backgroundColor: dot.color,
                boxShadow: `0 0 10px 3px ${dot.color}80`,
                transform: `rotate(${dot.angle}deg) translateX(${dot.radius}px)`,
              }}
            />
          </motion.div>
        ))}

        <motion.img
          src="/ai-head.png"
          alt="EXAGENT AI mascot"
         animate={{
  y: [-12, 12, -12],
  x: [-20, 0, 20, 0, -20],
  rotate: [-4, 4, -4],
}}
transition={{
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut",
}}
          className="w-full h-auto object-contain select-none"
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        className="relative text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#F8FAFC] leading-tight tracking-tight"
      >
        Launch{" "}
        <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
          AI Agents
        </span>
        <br />
        with SGC
      </motion.h1>

      {/* Chat bar */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-2xl mt-10"
      >
        <div className="rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur-xl shadow-2xl shadow-black/40 px-5 py-4 sm:px-6 sm:py-5">
          <input
            type="text"
            placeholder="Are you ready to build your first AI Agent?"
            readOnly
            className="w-full bg-transparent text-[#F8FAFC] placeholder:text-[#94A3B8] text-sm sm:text-base focus:outline-none cursor-default"
          />

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 text-xs sm:text-sm font-medium transition-colors duration-200"
              >
                <Box size={14} />
                Build
                <ChevronDown size={14} />
              </button>

              <button
                type="button"
                aria-label="Attach file"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors duration-200"
              >
                <Paperclip size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 text-xs sm:text-sm font-medium transition-colors duration-200"
              >
                <Sparkles size={14} className="text-[#3B82F6]" />
                EXAGENT
                <ChevronDown size={14} />
              </button>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                aria-label="Send"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-[#F8FAFC] shadow-lg shadow-blue-500/30"
              >
                <ArrowDown size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Soft glow under the chat bar */}
        <div className="pointer-events-none absolute left-1/2 -bottom-6 -translate-x-1/2 w-3/4 h-10 bg-[#3B82F6]/30 blur-2xl rounded-full -z-10" />
      </motion.div>
    </section>
  );
};

export default IntroSection;