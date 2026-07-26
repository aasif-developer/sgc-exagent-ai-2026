// Pure JavaScript validation utility for the registration form.
// No React code should be added here.

// ========================================
// Configuration
// ========================================

const DEPARTMENTS_WITH_SECTIONS = ["CSE", "IT"];

// ========================================
// Sanitizers
// ========================================

function sanitizeName(value = "") {
  return String(value).trim().replace(/\s+/g, " ");
}

function sanitizeText(value = "") {
  return String(value).trim();
}

function sanitizeRollNumber(value = "") {
  return String(value)
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

function sanitizeEmail(value = "") {
  return String(value)
    .trim()
    .toLowerCase();
}

function sanitizePhone(value = "") {
  return String(value).replace(/\D/g, "");
}

// ========================================
// Validators
// ========================================

function validateName(name) {
  if (!name) {
    return "Full name is required.";
  }

  if (name.length < 3) {
    return "Full name must be at least 3 characters long.";
  }

  if (name.length > 50) {
    return "Full name must not exceed 50 characters.";
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    return "Full name can only contain letters and spaces.";
  }

  return null;
}

function validateDepartment(department) {
  if (!department) {
    return "Please select your department.";
  }

  return null;
}

function isSectionRequiredForDepartment(department) {
  return DEPARTMENTS_WITH_SECTIONS.some((dept) =>
    department.includes(dept)
  );
}

function validateSection(section, department) {
  if (
    isSectionRequiredForDepartment(department) &&
    !section
  ) {
    return "Please select your section.";
  }

  return null;
}

function validateRollNumber(rollNumber) {
  if (!rollNumber) {
    return "Roll Number is required.";
  }

  if (rollNumber.length < 5 || rollNumber.length > 8) {
    return "Please enter your complete Roll Number. ";
  }

  if (!/^[A-Z0-9]+$/.test(rollNumber)) {
    return "Roll Number can only contain letters and numbers.";
  }

  return null;
}

function validateEmail(email) {
  if (!email) {
    return "Email address is required.";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  return null;
}

function validatePhone(phone) {
  if (!phone) {
    return "Phone number is required.";
  }

  if (!/^\d{10}$/.test(phone)) {
    return "Phone number must contain exactly 10 digits.";
  }

  return null;
}

// ========================================
// Main Validation Function
// ========================================

export function validateRegistration(formData) {
  // Create a cleaned copy (never mutate original data)
  const data = {
    fullName: sanitizeName(formData.fullName),
    department: sanitizeText(formData.department),
    section: sanitizeText(formData.section || ""),
    rollNumber: sanitizeRollNumber(formData.rollNumber),
    email: sanitizeEmail(formData.email),
    phone: sanitizePhone(formData.phone),
  };

  const errors = {};

  const validations = {
    fullName: validateName(data.fullName),
    department: validateDepartment(data.department),
    section: validateSection(
      data.section,
      data.department
    ),
    rollNumber: validateRollNumber(data.rollNumber),
    email: validateEmail(data.email),
    phone: validatePhone(data.phone),
  };

  Object.entries(validations).forEach(([field, error]) => {
    if (error) {
      errors[field] = error;
    }
  });

  return {
    success: Object.keys(errors).length === 0,
    errors,
    data,
  };
}