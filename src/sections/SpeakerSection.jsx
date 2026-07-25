import { motion } from "framer-motion";
import speakerImage from "../assets/images/speaker.jpg";

// Speaker profile details — edit here to update the section
const speaker = {
  name: "Hrithik Kademani",
  role: "Software Developer",
  company: "Merida Tech Minds",
  bio: "Hrithik Kademani is a Software Developer at Merida Tech Minds specializing in AI and Python. He will lead the EXAGENT AI Workshop, helping students build AI applications through practical, hands-on learning.",
  linkedinUrl: "https://www.linkedin.com/in/hrithik-kademani",
};

// Speaker expertise/skill tags
const expertise = [
  "AI Agents",
  "Prompt Engineering",
  "Python",
  "LLMs",
  "Automation",
  "Hands-on Projects",
];

/**
 * SpeakerSection
 * Introduces the workshop's chief guest with a circular profile image,
 * LinkedIn link, bio, and expertise chips inside a premium
 * glassmorphism card.
 */
const SpeakerSection = () => {
  return (
    <section id="speaker" className="relative bg-[#030712] py-12 md:py-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-[#3B82F6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[24rem] h-[24rem] bg-[#8B5CF6]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Chief Guest
            </span>
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Learn from an industry professional building real-world AI solutions.
          </p>
        </motion.div>

        {/* Speaker card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#111827]/60 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
        >
          {/* Gradient overlay wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/10" />

          {/* Glowing radial accents */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 bg-[#3B82F6]/20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 bg-[#8B5CF6]/20 rounded-full blur-3xl" />

          {/* Decorative dot grid (top-right corner) */}
          <div className="pointer-events-none absolute top-6 right-6 hidden sm:grid grid-cols-5 gap-1.5 opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-[#94A3B8]" />
            ))}
          </div>

          {/* Decorative diagonal line (bottom-left corner) */}
          <div className="pointer-events-none absolute -bottom-4 -left-4 w-32 h-32 border-l border-b border-white/10 rounded-bl-3xl" />

          <div className="relative p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Image + LinkedIn column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col items-center shrink-0"
            >
              {/* Circular image with gradient border + glow */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className="relative"
              >
                <div className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-br from-[#3B82F6]/40 to-[#8B5CF6]/40 blur-2xl" />
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#111827] border-2 border-[#030712]">
                    <img
                      src={speakerImage}
                      alt="Speaker"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* LinkedIn button */}
              <motion.a
                href={speaker.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-[#F8FAFC] text-sm sm:text-base font-semibold shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition-shadow duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.9 2.7 4.9 6.3V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.8 1.9-2.8 3.8V24H8V8z" />
                </svg>
                Connect on LinkedIn
              </motion.a>
            </motion.div>

            {/* Details column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-center md:text-left flex-1"
            >
              <span className="text-[#3B82F6] text-xs font-semibold uppercase tracking-widest">
                Chief Guest
              </span>

              <h3 className="mt-2 text-[#F8FAFC] font-extrabold text-3xl sm:text-4xl tracking-tight">
                {speaker.name}
              </h3>

              <p className="mt-1.5 text-slate-400 text-sm sm:text-base font-medium">
                {speaker.role} &middot; {speaker.company}
              </p>

              <p className="mt-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed sm:leading-loose max-w-xl mx-auto md:mx-0">
                {speaker.bio}
              </p>

              {/* Expertise chips */}
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2.5">
                {expertise.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05, ease: "easeOut" }}
                    whileHover={{ y: -3 }}
                    className="px-4 py-1.5 rounded-full text-xs font-medium text-[#F8FAFC] bg-white/5 border border-white/10 hover:border-[#3B82F6]/50 hover:bg-white/10 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakerSection;