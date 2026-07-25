// src/services/registrationService.js

const TEAMS_LIST = [
  "Superman",
  "Doctor Doom",
  "Batman",
  "Iron Man",
  "Thanos",
  "Captain America",
  "Thor",
  "Hulk",
  "Spider-Man",
  "Flash"
];

/**
 * MOCKED Register a student for visual design verification
 */
export const registerStudent = async (studentData) => {
  let selectedTeam = "Superman";
  const searchName = studentData.fullName.toLowerCase();
  
  if (searchName.includes("doom")) {
    selectedTeam = "Doctor Doom";
  } else if (searchName.includes("thanos")) {
    selectedTeam = "Thanos";
  } else if (searchName.includes("iron")) {
    selectedTeam = "Iron Man";
  } else if (searchName.includes("batman")) {
    selectedTeam = "Batman";
  } else if (searchName.includes("captain")) {
    selectedTeam = "Captain America";
  } else if (searchName.includes("thor")) {
    selectedTeam = "Thor";
  } else if (searchName.includes("hulk")) {
    selectedTeam = "Hulk";
  } else if (searchName.includes("spider")) {
    selectedTeam = "Spider-Man";
  } else if (searchName.includes("flash")) {
    selectedTeam = "Flash";
  } else {
    selectedTeam = "Superman";
  }

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
      team_id: 1,
      team_name: selectedTeam
    }
  };
};