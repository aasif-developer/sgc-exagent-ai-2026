import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, ChevronDown } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { validateRegistration } from "../utils/validation";
import { registerStudent } from "../services/registrationService";
import TeamCardModal from "../components/TeamCardModal";
// Department options
const departments = [
  "CSE",
  "IT",
  "AIDS",
];

// Departments that require a Section field
const departmentsWithSections = [
  "CSE",
  "IT",
];

// Section options
const sections = ["A", "B"];

// Initial form state
const initialFormData = {
  fullName: "",
  department: "",
  section: "",
  rollNumber: "",
  email: "",
  phone: "",
};

/**
 * Register
 * Workshop registration page. UI only for now — form state is wired
 * up via a single formData object so validation and backend submission
 * can be layered in later without touching the markup. Reuses the
 * site's existing Header and Footer and matches the premium dark
 * glassmorphism design system.
 */
const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
const [student, setStudent] = useState(null);

useEffect(() => {
  const images = [
    "/team-images/drdoom.png",
    "/team-images/thanos.png",
    "/team-images/ironman.png",
    "/team-images/captainamerica.png",
    "/team-images/thor.png",
    "/team-images/hulk.png",
    "/team-images/siperman.png",
    "/team-images/superman.png",
    "/team-images/batman.png",
    "/team-images/flash.png",
    "/team-images/default.png",
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}, []);

  const showSection = departmentsWithSections.includes(formData.department);

  // Generic change handler shared by every input and select
 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};

  // Form submit handler
const handleSubmit = async (e) => {
  e.preventDefault();

  const result = validateRegistration(formData);

  if (!result.success) {
    setErrors(result.errors);
    return;
  }

  // Clear previous errors
  setErrors({});

  // Register student
  const response = await registerStudent(result.data);

  if (!response.success) {
    alert(response.error);
    return;
  }

setStudent(response.student);
setShowModal(true);
  // Reset form
  setFormData(initialFormData);
};

  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-[#030712] pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Background glow + grid, matching the rest of the site */}
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

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-5">
              <UserPlus size={14} className="text-[#3B82F6]" />
              <span className="text-[#94A3B8] text-xs font-medium tracking-wide">
                3rd Year Students Only
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8FAFC] tracking-tight">
              Register for{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                EXAGENT AI
              </span>
            </h1>
            <p className="mt-4 text-[#94A3B8] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Secure your spot in this exclusive AI workshop. Fill in your
              details below — it only takes a minute.
            </p>
          </motion.div>

          {/* Registration Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative rounded-2xl border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-2xl shadow-black/40 p-6 sm:p-8 md:p-10"
          >
            {/* Card glow accents */}
            <div className="pointer-events-none absolute -z-10 -top-8 -right-8 w-40 h-40 bg-[#8B5CF6]/20 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-[#3B82F6]/20 rounded-full blur-3xl" />

            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="text-[#F8FAFC] text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  maxLength={50}
                  required
                  className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
                />
                {errors.fullName && (
  <p className="mt-1 text-sm text-red-500">
    {errors.fullName}
  </p>
)}
              </div>

              {/* Department + Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
  {/* Department */}
  <div className="flex flex-col gap-2">
    <label
      htmlFor="department"
      className="text-[#F8FAFC] text-sm font-medium"
    >
      Department
    </label>

    <div className="relative">
      <select
        id="department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
        className="w-full appearance-none rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 pr-10 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
      >
        <option value="" className="bg-[#111827] text-[#94A3B8]">
          Select your department
        </option>

        {departments.map((dept) => (
          <option
            key={dept}
            value={dept}
            className="bg-[#111827] text-[#F8FAFC]"
          >
            {dept}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
      />
    </div>

    {errors.department && (
      <p className="mt-1 text-sm text-red-500">
        {errors.department}
      </p>
    )}
  </div>

  {/* Section - only for CSE & IT */}
  {showSection && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-2 overflow-hidden"
    >
      <label
        htmlFor="section"
        className="text-[#F8FAFC] text-sm font-medium"
      >
        Section
      </label>

      <div className="relative">
        <select
          id="section"
          name="section"
          value={formData.section}
          onChange={handleChange}
          required={showSection}
          className="w-full appearance-none rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 pr-10 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
        >
          <option value="" className="bg-[#111827] text-[#94A3B8]">
            Select your section
          </option>

          {sections.map((sec) => (
            <option
              key={sec}
              value={sec}
              className="bg-[#111827] text-[#F8FAFC]"
            >
              {sec}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />
      </div>

      {errors.section && (
        <p className="mt-1 text-sm text-red-500">
          {errors.section}
        </p>
      )}
    </motion.div>
  )}
</div>
              {/* Roll Number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="rollNumber"
                  className="text-[#F8FAFC] text-sm font-medium"
                >
                  Roll Number
                </label>
                <input
                  id="rollNumber"
                  name="rollNumber"
                  type="text"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="Enter your roll number"
                  autoComplete="off"
                  maxLength={20}
                  required
                  className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
                />
                {errors.rollNumber && (
  <p className="mt-1 text-sm text-red-500">
    {errors.rollNumber}
  </p>
)}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[#F8FAFC] text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
                  />
                  {errors.email && (
  <p className="mt-1 text-sm text-red-500">
    {errors.email}
  </p>
)}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-[#F8FAFC] text-sm font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    maxLength={10}
                    required
                    className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200"
                  />
                  {errors.phone && (
  <p className="mt-1 text-sm text-red-500">
    {errors.phone}
  </p>
)}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-[#F8FAFC] text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition-shadow duration-200"
              >
                Register Now
                <UserPlus size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
      <TeamCardModal
  open={showModal}
  student={student}
  onClose={() => setShowModal(false)}
/>
    </>
  );
};

export default Register;