import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// FAQ data
const faqs = [
  {
    id: "who-can-attend",
    question: "Who can attend the EXAGENT AI Workshop?",
    answer:
      "This workshop is exclusively open to 3rd Year students. Please have your college ID ready during registration and check-in.",
  },
  {
    id: "prior-knowledge",
    question: "Do I need prior AI or coding experience?",
    answer:
      "No prior AI experience is required. Basic familiarity with programming concepts is helpful but not mandatory — the session is designed to be beginner-friendly.",
  },
  {
    id: "what-to-bring",
    question: "What should I bring to the workshop?",
    answer:
      "Bring a laptop if possible, your student ID, and a notebook. All other resources and materials will be provided during the session.",
  },
  {
    id: "certificate",
    question: "Will I receive a certificate?",
    answer:
      "Yes, every student who completes the workshop will receive an official certificate of participation from the Student Guidance Cell.",
  },
  {
    id: "speaker",
    question: "Who will conduct the workshop?",
    answer:
      "The workshop will be conducted by Hrithik Kademani, Software Developer at Merida Tech Minds, with practical sessions on AI Agents and modern AI development.",
  },
];

/**
 * FAQSection
 * Accordion-style list of frequently asked questions with a smooth
 * open/close animation, only one item open at a time.
 */
const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative bg-[#030712] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Everything you need to know before registering.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                className="rounded-xl border border-white/10 bg-[#111827]/60 backdrop-blur-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[#F8FAFC] text-sm sm:text-base font-medium">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown size={18} className="text-[#94A3B8]" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-[#94A3B8] text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;