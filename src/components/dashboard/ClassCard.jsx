import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClassCard = ({
  department,
  section,
  studentCount,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/coordinator", {
  state: {
    department,
    section,
  },
});
  };

  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="group w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:border-violet-500/30 hover:bg-white/10"
    >
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">
            <GraduationCap size={24} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {department} - {section}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
              <Users size={15} />
              <span>{studentCount} Students</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <ArrowRight
          size={22}
          className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-300"
        />
      </div>
    </motion.button>
  );
};

export default ClassCard;