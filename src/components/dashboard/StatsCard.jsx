import { motion } from "framer-motion";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "text-blue-400",
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg shadow-black/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ${color}`}
        >
          {Icon && <Icon size={28} />}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;