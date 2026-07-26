import { supabase } from "./supabase";

// Get all students (Admin)
export const getAllStudents = async () => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("id", { ascending: true });

  return { data, error };
};

// Update payment status
export const updatePaymentStatus = async (
  studentId,
  status
) => {
  const { data, error } = await supabase
    .from("students")
    .update({
      payment_status: status,
    })
    .eq("id", studentId)
    .select()
    .single();

  return { data, error };
};

// Get students by department & section (Coordinator)
export const getStudentsByCoordinator = async (
  department,
  section
) => {
  let query = supabase
    .from("students")
    .select("*")
    .eq("department", department);

  // Only filter by section if it exists
  if (section) {
    query = query.eq("section", section);
  }

  const { data, error } = await query.order("id", {
    ascending: true,
  });

  return { data, error };
};

// Get department-wise student counts (Admin Dashboard)
export const getDepartmentCounts = async () => {
  const { data, error } = await supabase
    .from("students")
    .select("department, section");

  if (error) {
    return { data: null, error };
  }

  const counts = {};

  data.forEach((student) => {
    // AIDS has no sections
    const key =
      student.department === "AIDS"
        ? "AIDS"
        : `${student.department}-${student.section}`;

    if (!counts[key]) {
      counts[key] = {
        department: student.department,
        section:
          student.department === "AIDS"
            ? ""
            : student.section,
        studentCount: 0,
      };
    }

    counts[key].studentCount++;
  });

  const departmentOrder = {
    CSE: 1,
    IT: 2,
    AIDS: 3,
  };

  return {
    data: Object.values(counts).sort((a, b) => {
      if (departmentOrder[a.department] !== departmentOrder[b.department]) {
        return (
          departmentOrder[a.department] -
          departmentOrder[b.department]
        );
      }

      return (a.section || "").localeCompare(
        b.section || ""
      );
    }),
    error: null,
  };
};