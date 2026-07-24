import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#030712] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-2xl shadow-black/40 p-8 sm:p-10">
            {/* Heading */}
            <div className="text-center">
              <span className="inline-flex items-center rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-4 py-1 text-sm font-medium text-[#3B82F6]">
                EXAGENT AI Workshop
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-white">
                Workshop Registration
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
                Register now to secure your seat for the EXAGENT AI Workshop
                organized by the Student Guidance Cell. Complete the form below
                with accurate details.
              </p>
            </div>

            {/* Workshop Info */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#030712]/40 p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Date
                </p>
                <p className="mt-2 font-semibold text-white">
                  31 July 2026
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#030712]/40 p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Time
                </p>
                <p className="mt-2 font-semibold text-white">
                  9:00 AM
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#030712]/40 p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Venue
                </p>
                <p className="mt-2 font-semibold text-white">
                  Seminar Hall
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#030712]/40 p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Eligibility
                </p>
                <p className="mt-2 font-semibold text-white">
                  3rd Year
                </p>
              </div>
            </div>

            {/* Placeholder */}
            <div className="mt-12 rounded-2xl border-2 border-dashed border-[#3B82F6]/30 p-10 text-center">
              <h2 className="text-2xl font-semibold text-white">
                Registration Form
              </h2>

              <p className="mt-3 text-slate-400">
                The complete registration form will be implemented here.
              </p>

              <div className="mt-8 space-y-2 text-sm text-slate-500">
                <p>• Personal Information</p>
                <p>• Academic Details</p>
                <p>• Contact Information</p>
                <p>• AI Experience</p>
                <p>• Declaration & Submit</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Register;