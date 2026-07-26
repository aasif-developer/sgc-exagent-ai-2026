// src/services/registrationService.js

import { supabase, isSupabaseConfigured } from "./supabase";
import { TEAMS } from "../data/teams";
import { allocateTeam } from "./teamAllocation";

// Fallback logic for mock mode
const getMockTeam = (name) => {
  const searchName = name.toLowerCase();
  if (searchName.includes("doom")) return "Doctor Doom";
  if (searchName.includes("thanos")) return "Thanos";
  if (searchName.includes("iron")) return "Iron Man";
  if (searchName.includes("batman")) return "Batman";
  if (searchName.includes("captain")) return "Captain America";
  if (searchName.includes("thor")) return "Thor";
  if (searchName.includes("hulk")) return "Hulk";
  if (searchName.includes("spider")) return "Spider-Man";
  if (searchName.includes("flash")) return "Flash";
  return "Superman";
};

/**
 * Register a student and assign a team.
 * Falls back to offline mock mode if Supabase credentials are not configured.
 * @param {Object} studentData
 * @returns {Object}
 */
export const registerStudent = async (studentData) => {
  // Offline Mock Fallback (safe for local development / testing)
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not configured. Falling back to offline mock mode for design preview.");
    
    const selectedTeam = getMockTeam(studentData.fullName);

    return {
      success: true,
      student: {
        id: 999,
        name: studentData.fullName,
        email: studentData.email,
        phone: studentData.phone,
        roll_number: studentData.rollNumber,
        department: studentData.department,
        section: studentData.section,
        team_id: TEAMS.find(t => t.name === selectedTeam)?.id || 1,
        team_name: selectedTeam
      }
    };
  }

  // Real Production Supabase Flow
  try {
    // Check if Roll Number is already registered
const { data: existingStudent, error: checkError } = await supabase
  .from("students")
  .select("id , team_name")
  .eq("roll_number", studentData.rollNumber)
  .maybeSingle();

if (checkError) {
  throw checkError;
}

if (existingStudent) {
  return {
    success: false,
    error: `Registration already exists for Roll Number ${studentData.rollNumber}.\n\n🎯 Assigned Team: ${existingStudent.team_name}\n\nDuplicate registration is not allowed.`,
  };
}
    // Fetch all registered students
    const { data: students, error: fetchError } = await supabase
      .from("students")
      .select("team_id, department, section");

    if (fetchError) {
      throw fetchError;
    }

    // Initialize team statistics
    const teamStats = TEAMS.map((team) => ({
      teamId: team.id,
      "CSE-A": 0,
      "CSE-B": 0,
      "IT-A": 0,
      "IT-B": 0,
      AIDS: 0,
    }));

    // Count students in each team
    students.forEach((student) => {
      const team = teamStats.find(
        (t) => t.teamId === student.team_id
      );

      if (!team) return;

      // Build category
      const category =
        student.department === "AIDS"
          ? "AIDS"
          : `${student.department}-${student.section}`;

      if (team.hasOwnProperty(category)) {
        team[category]++;
      }
    });

    // Allocate team
    const assignedTeam = allocateTeam(
      studentData.department,
      studentData.section,
      teamStats
    );

    // Prepare registration object
    const registration = {
      name: studentData.fullName,
      email: studentData.email,
      phone: studentData.phone,
      roll_number: studentData.rollNumber,
      department: studentData.department,
      section: studentData.section,
      team_id: assignedTeam.id,
      team_name: assignedTeam.name,
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from("students")
      .insert([registration])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      student: data,
    };
  } catch (error) {
    console.error("Registration Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};