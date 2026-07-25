import { useState } from "react";
import { motion } from "framer-motion";
import { updatePaymentStatus } from "../../services/studentService";

const StudentTable = ({
  students = [],
  refreshStudents,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handlePaymentToggle = async () => {
    if (!selectedStudent) return;

    const { error } = await updatePaymentStatus(
      selectedStudent.id,
      !selectedStudent.payment_status
    );

    if (!error && refreshStudents) {
      refreshStudents();
    }

    setShowConfirm(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <table className="min-w-full text-left">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                Name
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-center">
                Payment
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                Roll No
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                Team
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-6 py-4 text-white">
                    {student.name}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={student.payment_status}
                      onChange={() => {
                        setSelectedStudent(student);
                        setShowConfirm(true);
                      }}
                      className="h-5 w-5 cursor-pointer accent-emerald-500"
                    />
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {student.roll_number}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {student.team_name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-slate-400"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[320px] rounded-xl border border-white/10 bg-[#111827] p-5"
          >
            <p className="text-white text-center">
  Mark{" "}
  <span className="font-semibold">
    {selectedStudent?.name}
  </span>{" "}
  as{" "}
  <span
    className={`font-semibold ${
      selectedStudent?.payment_status
        ? "text-red-400"
        : "text-emerald-400"
    }`}
  >
    {selectedStudent?.payment_status
      ? "UNPAID"
      : "PAID"}
  </span>
  ?
</p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedStudent(null);
                }}
                className="rounded-lg border border-white/10 px-4 py-2 text-slate-300 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
  onClick={handlePaymentToggle}
  className={`rounded-lg px-4 py-2 text-white transition ${
    selectedStudent?.payment_status
      ? "bg-red-600 hover:bg-red-700"
      : "bg-emerald-600 hover:bg-emerald-700"
  }`}
>
  {selectedStudent?.payment_status
    ? "Mark Unpaid"
    : "Confirm ✓"}
</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default StudentTable;