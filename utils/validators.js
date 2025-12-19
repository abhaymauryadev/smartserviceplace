import { BOOKING_STATUS, USER_ROLES } from "./constants";

// Email validation
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password validation
export function isValidPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

// MongoDB ObjectId validation
export function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

// Booking status validation
export function isValidBookingStatus(status) {
  return Object.values(BOOKING_STATUS).includes(status);
}

// Role validation
export function isValidUserRole(role) {
  return Object.values(USER_ROLES).includes(role);
}
