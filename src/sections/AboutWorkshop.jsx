import { motion } from "framer-motion";

const terminalLines = [
  "Checking Requirements...",
  "",
  "✓ Curiosity",
  "✓ Laptop",
  "✓ Passion",
  "",
  "Loading AI Modules...",
  "████████████████ 100%",
  "",
  "Installing:",
  "✓ AI Agents",
  "✓ Prompt Engineering",
  "✓ Modern AI Tools",
  "✓ Hands-on Project",
  "",
  "Workshop Ready!",
  "",
  "Press Register to join... █",
];

const AboutWorkshop = () => {
  return (
    <section
      id="about"
      className="relative bg-[#030712] py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              About the{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                Workshop
              </span>
            </h2>

            <p className="mt-6 text-slate-400 text-lg leading-8">
              <span className="text-white font-medium">EXAGENT AI</span> is a
              hands-on workshop designed to introduce students to AI Agents and
              modern AI development. Learn by building real projects, exploring
              industry tools, and gaining practical experience beyond the
              classroom.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "AI Agents",
                "LLMs",
                "Automation",
                "Hands-on Project",
                "Certificate",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111111]">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-[#1A1A1A]">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />

                <span className="ml-4 text-xs text-slate-400">
                  Terminal
                </span>
              </div>

              {/* Terminal Body */}
              <div className="font-mono text-sm md:text-base p-6 space-y-2 text-slate-200">
                <div className="text-blue-400">
                  $ exagent start
                </div>

                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.25,
                    }}
                    className={
                      line.startsWith("✓")
                        ? "text-green-400"
                        : line.includes("100%")
                        ? "text-blue-400"
                        : line.includes("Workshop Ready")
                        ? "text-violet-400"
                        : ""
                    }
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutWorkshop;