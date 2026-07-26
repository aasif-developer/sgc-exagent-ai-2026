import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Bot, ArrowDown } from "lucide-react";
import sgcLogo from "../assets/logos/sgc-logo.png";

// Workshop start date/time — 31 July 2026, 9:00 AM
const WORKSHOP_DATE = new Date("2026-07-31T09:00:00");

// Computes remaining days/hours/minutes/seconds until the workshop date
const getTimeLeft = () => {
  const diff = WORKSHOP_DATE.getTime() - new Date().getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

// Floating particle positions (kept static so they don't re-randomize on every render)
const particles = [
  { top: "10%", left: "12%", size: 6, delay: 0 },
  { top: "20%", left: "85%", size: 4, delay: 0.4 },
  { top: "70%", left: "8%", size: 5, delay: 0.8 },
  { top: "80%", left: "90%", size: 6, delay: 1.2 },
  { top: "35%", left: "50%", size: 3, delay: 1.6 },
  { top: "60%", left: "35%", size: 4, delay: 2 },
  { top: "15%", left: "60%", size: 5, delay: 0.6 },
  { top: "88%", left: "55%", size: 4, delay: 1 },
];

/**
 * HeroSection
 * Full-screen hero establishing the SGC → EXAGENT AI → 3rd Year Students
 * hierarchy, with a premium AI-inspired visual (mock agent chat card),
 * a live countdown to the workshop date, and the primary CTA.
 */
const HeroSection = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  // Tick the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToAbout = () => {
    const target = document.querySelector("#about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Countdown units rendered in order, each padded to 2 digits
  const countdownUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#030712] pt-24 pb-16 md:pt-32"
    >
      {/* Background glow + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#3B82F6]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#8B5CF6]/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8FAFC] leading-tight tracking-tight">
            EXAGENT AI{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Workshop
            </span>
          </h1>

          {/* Eyebrow */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <img
              src={sgcLogo}
              alt="SGC Logo"
              className="w-5 h-5 object-contain"
            />
            <span className="text-[#94A3B8] text-xs font-medium tracking-wide">
              Presented by Student Guidance Cell
            </span>
          </div>

          <p className="mt-4 text-[#94A3B8] text-base sm:text-lg font-medium">
            An exclusive AI workshop for 3rd Year students only.
          </p>

          <p className="mt-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-xl">
            Dive into the world of AI Agents and modern AI technologies through
            hands-on sessions, real-world projects, and guidance from industry
            experts — built to take you from curious to capable.
          </p>

          {/* ================= Countdown (REPLACED SECTION) ================= */}
          <div className="relative mt-10 w-full max-w-md mx-auto lg:mx-0">
            {/* Watermark SGC logo behind the countdown */}
            <img
              src={sgcLogo}
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] max-w-none object-contain opacity-[0.06] blur-md -z-10"
            />

            {/* Floating glow particles */}
            <div className="pointer-events-none absolute -inset-8 -z-10 overflow-hidden">
              {particles.map((p, index) => (
                <motion.span
                  key={index}
                  className="absolute rounded-full bg-[#8B5CF6]"
                  style={{
                    top: p.top,
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    boxShadow: "0 0 8px 2px rgba(139,92,246,0.6)",
                  }}
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + index * 0.3,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Purple glow underneath the countdown */}
            <div className="pointer-events-none absolute left-1/2 -bottom-6 -translate-x-1/2 w-3/4 h-10 bg-[#8B5CF6]/40 blur-2xl rounded-full -z-10" />

            <h3 className="flex items-center justify-center lg:justify-start gap-2 text-[#F8FAFC] text-lg sm:text-xl font-bold mb-4">
              <Sparkles size={18} className="text-[#3B82F6]" />
              Workshop Starts In
            </h3>

            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
              {countdownUnits.map((unit, index) => (
                <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative w-16 sm:w-20 rounded-xl border border-white/10 bg-gradient-to-b from-[#111827]/90 to-[#111827]/50 backdrop-blur-xl p-3 sm:p-4 text-center shadow-lg shadow-black/40 overflow-hidden"
                  >
                    {/* Neon glow ring on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/20" />
                    <div className="pointer-events-none absolute -inset-px rounded-xl border border-[#8B5CF6]/0 shadow-[0_0_0px_rgba(139,92,246,0)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]" />

                    <div className="relative h-8 sm:h-9 flex items-center justify-center overflow-hidden">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={unit.value}
                          initial={{ y: 16, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -16, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="absolute text-2xl sm:text-3xl font-bold bg-gradient-to-b from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent tabular-nums"
                        >
                          {String(unit.value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <p className="relative mt-1 text-[10px] sm:text-xs text-[#94A3B8] uppercase tracking-wide">
                      {unit.label}
                    </p>
                  </motion.div>

                  {/* Separator, skipped after the last unit */}
                  {index < countdownUnits.length - 1 && (
                    <span className="hidden sm:block text-xl font-bold text-[#3B82F6]/70 -mt-4">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* =============== End Countdown (REPLACED SECTION) =============== */}

          {/* Workshop Date */}
<div className="mt-5 flex items-center justify-center lg:justify-start gap-2 text-[#94A3B8] text-xs sm:text-sm tracking-[0.15em] uppercase">
  <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#8B5CF6]/70" />
  <span>31 July 2026 • 9:00 AM</span>
  <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#8B5CF6]/70" />
</div>

          {/* CTA */}
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleScrollToAbout}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-[#F8FAFC] text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition-shadow duration-200"
            >
              Explore Workshop
              <ArrowDown size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: AI-inspired visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-2xl shadow-black/40 p-5 sm:p-6">
            {/* Card header */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
                <Bot size={16} className="text-[#F8FAFC]" />
              </div>
              <div>
                <p className="text-[#F8FAFC] text-sm font-semibold">
                  EXAGENT
                </p>
                <p className="text-[#94A3B8] text-xs">AI Agent · Online</p>
              </div>
            </div>

            {/* Mock chat bubbles */}
            <div className="flex flex-col gap-3">
              <div className="self-start max-w-[85%] rounded-xl rounded-tl-sm bg-white/5 border border-white/10 px-4 py-2.5">
                <p className="text-[#94A3B8] text-sm">
                  Ready to learn AI and build your first AI Agent?
                </p>
              </div>
              <div className="self-end max-w-[85%] rounded-xl rounded-tr-sm bg-gradient-to-r from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-white/10 px-4 py-2.5">
                <p className="text-[#F8FAFC] text-sm">
                  Sure! Let's build something amazing.
                </p>
              </div>
              <div className="self-start max-w-[85%] rounded-xl rounded-tl-sm bg-white/5 border border-white/10 px-4 py-2.5">
                <p className="text-[#94A3B8] text-sm">
                  Perfect, let's dive in.
                </p>
              </div>
            </div>

            {/* Typing indicator */}
            <div className="mt-4 flex items-center gap-1.5 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:300ms]" />
            </div>
          </div>

          {/* Floating glow accents behind the card */}
          <div className="pointer-events-none absolute -z-10 -top-6 -right-6 w-32 h-32 bg-[#8B5CF6]/30 rounded-full blur-2xl" />
          <div className="pointer-events-none absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-[#3B82F6]/30 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;