import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCard from "../components/dashboard/StatsCard";
import ClassCard from "../components/dashboard/ClassCard";

import {
  Users,
  CheckCircle,
  Clock,
  IndianRupee,
} from "lucide-react";

import {
  getAllStudents,
  getDepartmentCounts,
} from "../services/studentService";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [departmentCounts, setDepartmentCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const registrationFee = 25;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    const [
      { data: studentsData, error: studentsError },
      { data: departmentData, error: departmentError },
    ] = await Promise.all([
      getAllStudents(),
      getDepartmentCounts(),
    ]);

    if (!studentsError) {
      setStudents(studentsData || []);
    } else {
      console.error(studentsError);
    }

    if (!departmentError) {
      setDepartmentCounts(departmentData || []);
    } else {
      console.error(departmentError);
    }

    setLoading(false);
  };

  const totalStudents = students.length;
  const paidStudents = students.filter(
    (student) => student.payment_status
  ).length;
  const pendingStudents = totalStudents - paidStudents;
  const totalCollection = paidStudents * registrationFee;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#030712] pt-24 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <DashboardHeader role="admin" />

          {loading ? (
            <div className="mt-10 text-center text-slate-400">
              Loading dashboard...
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                  title="Total Students"
                  value={totalStudents}
                  icon={Users}
                  color="blue"
                />

                <StatsCard
                  title="Paid Students"
                  value={paidStudents}
                  icon={CheckCircle}
                  color="green"
                />

                <StatsCard
                  title="Pending Payments"
                  value={pendingStudents}
                  icon={Clock}
                  color="yellow"
                />

                <StatsCard
                  title="Total Collection"
                  value={`₹${totalCollection}`}
                  icon={IndianRupee}
                  color="purple"
                />
              </div>

              {/* Departments */}
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  Departments
                </h2>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {departmentCounts.map((department) => (
                    <ClassCard
                      key={`${department.department}-${department.section}`}
                      department={department.department}
                      section={department.section}
                      studentCount={department.studentCount}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminDashboard;