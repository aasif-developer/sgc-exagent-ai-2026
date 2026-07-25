import { useRef, useEffect, useState } from "react";
import { toBlob } from "html-to-image";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import sgcLogo from "../assets/logos/sgc-logo.png";

const teamImages = {
  "Doctor Doom": "/team-images/drdoom.png",
  Thanos: "/team-images/thanos.png",
  "Iron Man": "/team-images/ironman.png",
  "Captain America": "/team-images/captainamerica.png",
  Thor: "/team-images/thor.png",
  Hulk: "/team-images/hulk.png",
  "Spider-Man": "/team-images/siperman.png",
  Superman: "/team-images/superman.png",
  Batman: "/team-images/batman.png",
  Flash: "/team-images/flash.png",
  default: "/team-images/default.png",
};

const teamThemes = {
  "Doctor Doom": { color: "#00FF66" },
  Thanos: { color: "#C026D3" },
  "Iron Man": { color: "#FF3333" },
  "Captain America": { color: "#2563EB" },
  Thor: { color: "#EAB308" },
  Hulk: { color: "#16A34A" },
  "Spider-Man": { color: "#E11D48" },
  Superman: { color: "#00D2FF" },
  Batman: { color: "#A1A1AA" },
  Flash: { color: "#EF4444" },
};

/**
 * Custom hook to dynamically calculate the scale factor of the card
 * to fit inside any mobile/tablet viewport without cropping.
 */
const useCardScaler = (open) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      const cardWidth = 360;
      const cardHeight = 640;
      
      const maxW = window.innerWidth - 32; // Allow 16px padding on left/right
      const maxH = window.innerHeight - 200; // Allow 200px for buttons and modal margins

      const scaleX = maxW / cardWidth;
      const scaleY = maxH / cardHeight;
      
      // Keep it constrained, do not scale up past 1
      const newScale = Math.min(1, scaleX, scaleY);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return scale;
};

/**
 * Synthesizes a rapid card shuffling/spinning click sound using the Web Audio API.
 * Returns an object with a stop() function to terminate the audio context.
 */
const playSpinningSound = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  const ctx = new AudioContext();

  const playTick = (t) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    // Rapid high-to-low pitch sweep for a clean, mechanical card click
    osc.frequency.setValueAtTime(2000, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.025);

    gainNode.gain.setValueAtTime(0.05, t);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  };

  // Schedule clicks every 70 milliseconds
  const timerId = setInterval(() => {
    playTick(ctx.currentTime);
  }, 70);

  return {
    stop: () => {
      clearInterval(timerId);
      // Play one final solid click on stop
      playTick(ctx.currentTime);
      setTimeout(() => {
        ctx.close();
      }, 100);
    }
  };
};

/**
 * Synthesizes a space/sci-fi "whoosh" sound followed by an arpeggiated "reveal chime"
 * using the browser's native Web Audio API (zero dependencies, works completely offline).
 */
const playRevealSound = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();

  // --- 1. THE WHOOSH EFFECT (Aerodynamic sweeping sound) ---
  const osc1 = ctx.createOscillator();
  const gainNode1 = ctx.createGain();

  osc1.type = "triangle";
  // Pitch sweep: starts deep at 70Hz and sweeps rapidly to 550Hz in 0.4s
  osc1.frequency.setValueAtTime(70, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.4);

  // Volume envelope for whoosh: swells and fades out
  gainNode1.gain.setValueAtTime(0.001, ctx.currentTime);
  gainNode1.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.15);
  gainNode1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

  osc1.connect(gainNode1);
  gainNode1.connect(ctx.destination);

  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.5);

  // --- 2. THE REVEAL CHIME EFFECT (High-tech arpeggiating sparkle) ---
  const playChimeTone = (freq, startTime, duration) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    // Slight pitch shimmer modulation
    osc.frequency.linearRampToValueAtTime(freq * 1.008, startTime + duration);

    gainNode.gain.setValueAtTime(0.001, startTime);
    gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  };

  // Trigger arpeggiated tones starting right as the whoosh reaches peak swell (0.2s)
  const startTime = ctx.currentTime + 0.2;
  playChimeTone(523.25, startTime, 0.65);         // C5
  playChimeTone(659.25, startTime + 0.08, 0.75);  // E5
  playChimeTone(783.99, startTime + 0.16, 0.85);  // G5
  playChimeTone(1046.50, startTime + 0.24, 0.95); // C6
  playChimeTone(1318.51, startTime + 0.32, 1.1);  // E6
};

/**
 * TeamCardContent
 *
 * Renders the pre-designed team card template image as a background,
 * and overlays the student's name in the correct position.
 */
const TeamCardContent = ({ student, teamImage, innerRef }) => {
  return (
    <div
      ref={innerRef}
      className="relative w-[360px] h-[640px] bg-[#030712] overflow-hidden select-none"
      style={{
        backgroundImage: `url(${teamImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Student Details Overlay */}
      <div className="absolute top-[494px] left-[24px] w-[312px] flex flex-col items-center">
        {/* Student Name */}
        <p className="text-white text-xl font-bold tracking-[0.05em] uppercase text-center font-rajdhani max-w-[280px] truncate">
          {student.name}
        </p>
      </div>
    </div>
  );
};

/**
 * CardBackContent
 *
 * Renders the generic backplate of the sci-fi cards.
 */
const CardBackContent = ({ theme }) => {
  return (
    <div
      style={{
        boxShadow: `inset 0 0 50px rgba(0, 0, 0, 0.95)`,
      }}
      className="relative w-full h-full bg-[#060b13] flex flex-col items-center justify-center border-2 border-white/10"
    >
      {/* Back Card SVG Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 360 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`glow-back-${theme.color.replace("#", "")}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Beveled Neon Border */}
        <path
          d="M 32 8 L 328 8 L 352 32 L 352 608 L 328 632 L 32 632 L 8 608 L 8 32 Z"
          stroke={theme.color}
          strokeWidth="2"
          filter={`url(#glow-back-${theme.color.replace("#", "")})`}
        />

        {/* Inner Border */}
        <path
          d="M 36 12 L 324 12 L 348 36 L 348 604 L 324 628 L 36 628 L 12 604 L 12 36 Z"
          stroke={theme.color}
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* SGC Emblem */}
      <div className="relative flex flex-col items-center gap-4 animate-pulse">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center bg-white/5 border border-white/10"
          style={{
            boxShadow: `0 0 25px ${theme.color}33`,
          }}
        >
          <img src={sgcLogo} alt="SGC" className="w-12 h-12 object-contain opacity-85" />
        </div>
        <span className="text-[#94A3B8] text-xs font-bold tracking-[0.25em] font-orbitron uppercase text-center">
          EXAGENT AI
        </span>
      </div>
    </div>
  );
};

const TeamCardModal = ({ open, student, onClose }) => {
  if (!student) return null;

  const teamImage = teamImages[student.team_name] || teamImages.default;
  const theme = teamThemes[student.team_name] || { color: "#3B82F6" };

  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef(null);
  
  // Responsive Scale factor calculation
  const scale = useCardScaler(open);

  // Shuffles/spins first, then triggers the reveal whoosh chime sound
  useEffect(() => {
    if (open) {
      setIsRevealed(false);
      const spinSound = playSpinningSound();

      const timer = setTimeout(() => {
        if (spinSound) spinSound.stop();
        setIsRevealed(true);
        playRevealSound();
      }, 1500); // Spin for 1.5 seconds

      return () => {
        clearTimeout(timer);
        if (spinSound) spinSound.stop();
      };
    }
  }, [open, student]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // Use toBlob instead of toPng for large images to ensure proper file naming on Chrome
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#030712",
      });

      // Create a local blob URL
      const dataUrl = URL.createObjectURL(blob);

      // Construct and trigger download link
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${student.name.replace(/\s+/g, "_")}-TeamCard.png`;
      
      // Append to body to ensure compatibility with all mobile & desktop browsers
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL to release browser memory
      setTimeout(() => {
        URL.revokeObjectURL(dataUrl);
      }, 100);
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/90 backdrop-blur-md px-4 overflow-y-auto py-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 max-w-full"
          >
            {/* Scaled Wrapper to maintain layout positioning in document flow */}
            <div
              style={{
                width: `${360 * scale}px`,
                height: `${640 * scale}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* The visible sci-fi card container with 3D spinning pack opening animation */}
              <motion.div
                animate={isRevealed ? {
                  rotateY: 360,
                  rotateX: 0,
                  scale: scale,
                  z: 0,
                  filter: "brightness(1) blur(0px)"
                } : {
                  rotateY: [0, 360],
                  rotateX: 0,
                  scale: scale * 0.75,
                  z: -300,
                  filter: "brightness(0.85) blur(1px)"
                }}
                whileHover={isRevealed ? {
                  rotateY: 375,
                  rotateX: 10,
                  scale: scale * 1.03,
                  transition: { duration: 0.3 }
                } : {}}
                transition={isRevealed ? {
                  rotateY: {
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                    mass: 1.2
                  },
                  rotateX: {
                    type: "spring",
                    stiffness: 90,
                    damping: 14
                  },
                  scale: {
                    type: "spring",
                    stiffness: 120,
                    damping: 12
                  }
                } : {
                  rotateY: {
                    repeat: Infinity,
                    duration: 0.75,
                    ease: "linear"
                  },
                  scale: {
                    duration: 0.4
                  }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1200,
                  width: "360px",
                  height: "640px",
                  position: "absolute"
                }}
                className="shadow-[0_0_60px_rgba(0,0,0,0.95)] rounded-[24px]"
              >
                {/* Card Front (Visible only AFTER reveal, linked to export ref) */}
                <div 
                  ref={cardRef} 
                  style={{ backfaceVisibility: "hidden" }} 
                  className="rounded-[24px] overflow-hidden w-full h-full"
                >
                  {isRevealed ? (
                    <TeamCardContent student={student} teamImage={teamImage} />
                  ) : (
                    <CardBackContent theme={theme} />
                  )}
                </div>

                {/* Card Back (Always visible on back and during spin to keep front hidden) */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden"
                >
                  <CardBackContent theme={theme} />
                </div>
              </motion.div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[360px] px-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-[#F8FAFC] text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition-shadow duration-200 cursor-pointer"
              >
                <Download size={16} />
                Download Team Card
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 text-[#F8FAFC] text-sm font-medium hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamCardModal;