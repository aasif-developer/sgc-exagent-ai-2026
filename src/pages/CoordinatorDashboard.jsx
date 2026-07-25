import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Users, BadgeCheck, Clock3, IndianRupee } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCard from "../components/dashboard/StatsCard";
import StudentTable from "../components/dashboard/StudentTable";

import { getCurrentUser, getProfile } from "../services/auth";
import { getStudentsByCoordinator } from "../services/studentService";

const CoordinatorDashboard = () => {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalStudents: 0,
    paidStudents: 0,
    pendingStudents: 0,
    totalCollection: 0,
  });

  // ✅ Moved outside useEffect
  const loadDashboard = async () => {
    try {
      const { user } = await getCurrentUser();

      if (!user) return;

      const { data: profileData } = await getProfile(user.id);

      setProfile(profileData);

      const department =
  location.state?.department || profileData.department;

const section =
  location.state?.section || profileData.section;

const { data: studentData } =
  await getStudentsByCoordinator(
    department,
    section
  );

      const studentsList = studentData || [];

      setStudents(studentsList);

      const paidStudents = studentsList.filter(
        (student) => student.payment_status
      ).length;

      const pendingStudents =
        studentsList.length - paidStudents;

      const registrationFee = 25;

      setStats({
        totalStudents: studentsList.length,
        paidStudents,
        pendingStudents,
        totalCollection:
          paidStudents * registrationFee,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

const filteredStudents = students.filter((student) => {
  const search = searchTerm.trim().toLowerCase();

  // Match payment status with partial words & aliases
  const isPaidSearch =
    "paid".startsWith(search) ||
    "payment".startsWith(search) ||
    ["p", "pay", "paid", "payment", "yes", "true", "done"].includes(search);

  const isUnpaidSearch =
    "unpaid".startsWith(search) ||
    "pending".startsWith(search) ||
    ["u", "un", "unp", "unpaid", "pending", "no", "false"].includes(search);

  return (
    student.name?.toLowerCase().includes(search) ||
    student.roll_number?.toString().includes(search) ||
    student.team_name?.toLowerCase().includes(search) ||
    (isPaidSearch && student.payment_status) ||
    (isUnpaidSearch && !student.payment_status)
  );
});
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#030712] pt-28 flex items-center justify-center text-white">
          Loading Dashboard...
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#030712] pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <DashboardHeader
  role={profile?.role}
  department={
    location.state?.department || profile?.department
  }
  section={
    location.state?.section || profile?.section
  }
/>

          <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Total Students"
              value={stats.totalStudents}
              icon={Users}
              color="text-blue-400"
            />

            <StatsCard
              title="Paid Students"
              value={stats.paidStudents}
              icon={BadgeCheck}
              color="text-emerald-400"
            />

            <StatsCard
              title="Pending Payments"
              value={stats.pendingStudents}
              icon={Clock3}
              color="text-amber-400"
            />

            <StatsCard
              title="Total Collection"
              value={`₹${stats.totalCollection}`}
              icon={IndianRupee}
              color="text-violet-400"
            />
          </div>

          <div className="mb-6">
  <input
    type="text"
    placeholder="Search by Name, Roll No, Team or Paid/Unpaid..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 focus:border-violet-500 focus:outline-none"
  />
</div>

          <StudentTable
  students={filteredStudents}
  refreshStudents={loadDashboard}
/>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CoordinatorDashboard;