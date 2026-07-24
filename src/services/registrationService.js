// src/services/registrationService.js

import { supabase } from "./supabase";
import { TEAMS } from "../data/teams";
import { allocateTeam } from "./teamAllocation";

/**
 * Register a student and automatically assign a team.
 * @param {Object} studentData
 * @returns {Object}
 */
export const registerStudent = async (studentData) => {
  try {
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