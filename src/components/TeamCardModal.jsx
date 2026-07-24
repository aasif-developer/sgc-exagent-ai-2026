import { useRef } from "react";
import { toPng } from "html-to-image";
import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper, Download } from "lucide-react";

const teamImages = {
  "Doctor Doom": "/team-images/drdoom.png",
  Thanos: "/team-images/thanos.png",
  "Iron Man": "/team-images/ironman.png",
  "Captain America": "/team-images/captainamerica.png",
  Thor: "/team-images/thor.png",
  Hulk: "/team-images/hulk.png",
  "Spider-Man": "/team-images/spiderman.png",
  Superman: "/team-images/superman.png",
  Batman: "/team-images/batman.png",
  Flash: "/team-images/flash.png",
  default: "/team-images/default.png",
};

/**
 * TeamCardContent
 *
 * Pure presentational markup for the "card" itself — the part that should
 * end up in the downloaded PNG. Used in two places:
 *   1. Inside the visible, animated modal (no ref, just for display).
 *   2. Inside a hidden, off-screen container that exists solely so
 *      html-to-image has a clean DOM node (no buttons) to rasterize.
 *
 * Keeping this as a single shared component guarantees the visible card
 * and the exported PNG always stay visually identical.
 */
const TeamCardContent = ({ student, teamImage, innerRef }) => {
  return (
    <div ref={innerRef}>
      <div className="relative px-6 sm:px-10 pt-10 pb-8 sm:pb-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
          <PartyPopper size={14} className="text-[#3B82F6]" />
          <span className="text-[#94A3B8] text-xs font-medium tracking-wide uppercase">
            Registration Successful
          </span>
        </div>

        <p className="mt-5 text-[#F8FAFC] text-sm font-semibold tracking-tight">
          EXAGENT AI WORKSHOP
        </p>
        <p className="mt-1 text-[#94A3B8] text-xs">Student Guidance Cell</p>

        <div className="w-full h-px bg-white/10 my-6" />

        <p className="text-[#94A3B8] text-xs uppercase tracking-widest">
          Student Name
        </p>
        <p className="mt-1.5 text-[#F8FAFC] text-xl sm:text-2xl font-bold tracking-tight uppercase">
          {student.name}
        </p>

        <div className="w-full h-px bg-white/10 my-6" />

        <div className="w-[220px] h-[220px] rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
          <img
            src={teamImage}
            alt={student.team_name}
            className="w-full h-full object-contain"
          />
        </div>

        <p className="mt-6 text-[#94A3B8] text-xs uppercase tracking-widest">
          Your Team
        </p>
        <p className="mt-1.5 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent text-2xl sm:text-3xl font-bold tracking-tight uppercase">
          {student.team_name}
        </p>
      </div>
    </div>
  );
};

const TeamCardModal = ({ open, student, onClose }) => {
  if (!student) return null;

  const teamImage = teamImages[student.team_name] || teamImages.default;

  // This ref points ONLY at the hidden, button-free card used for export.
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#111827",
      });

      const link = document.createElement("a");
      link.download = `${student.name}-TeamCard.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Check the browser console for details.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-[520px] rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 bg-[#3B82F6]/20 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 bg-[#8B5CF6]/20 rounded-full blur-3xl" />

            {/* Visible card content — no ref here, this is just for display */}
            <TeamCardContent student={student} teamImage={teamImage} />

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full px-6 sm:px-10 pb-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-[#F8FAFC] text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition-shadow duration-200"
              >
                <Download size={16} />
                Download Team Card
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-[#F8FAFC] text-sm font-medium hover:bg-white/10 transition-colors duration-200"
              >
                Close
              </motion.button>
            </div>
          </motion.div>

          {/*
            Hidden, off-screen clone of ONLY the card content.
            
          */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: "-9999px",
              pointerEvents: "none",
            }}
          >
            <div className="w-[520px] rounded-3xl border border-white/10 bg-[#111827] overflow-hidden">
              <TeamCardContent
                student={student}
                teamImage={teamImage}
                innerRef={cardRef}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamCardModal;