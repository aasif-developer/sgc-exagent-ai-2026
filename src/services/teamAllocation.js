// src/services/teamAllocation.js

import { TEAMS } from "../data/teams";

/**
 * Returns the maximum students allowed for a category
 * in a particular team.
 */
const getCategoryLimit = (teamId, category) => {
  switch (category) {
    case "CSE-A":
    case "CSE-B":
    case "AIDS":
      return 6;

    case "IT-A":
      // Odd teams: 5 | Even teams: 4
      return teamId % 2 === 1 ? 5 : 4;

    case "IT-B":
      // Odd teams: 4 | Even teams: 5
      return teamId % 2 === 1 ? 4 : 5;

    default:
      throw new Error(`Invalid category: ${category}`);
  }
};

/**
 * Allocate the first available team based on
 * Department + Section.
 *
 * Categories:
 * CSE-A
 * CSE-B
 * IT-A
 * IT-B
 * AIDS
 */
export const allocateTeam = (
  department,
  section,
  teamStats = []
) => {
  // Build category
  const category =
    department === "AIDS"
      ? "AIDS"
      : `${department}-${section}`;

  // Check each team in order
  for (const team of TEAMS) {
    const stats = teamStats.find(
      (t) => t.teamId === team.id
    );

    const currentCount = stats?.[category] ?? 0;

    const maxStudents = getCategoryLimit(
      team.id,
      category
    );

    if (currentCount < maxStudents) {
      return team;
    }
  }

  throw new Error(
    `All ${category} seats have been filled. Registration closed.`
  );
};