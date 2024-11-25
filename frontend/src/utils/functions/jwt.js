import { jwtDecode } from "jwt-decode";

export function decodeToken(token) {
  try {
    return jwtDecode(token); // Decodes the token payload
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

export function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  return decoded.exp < currentTime; // Token is expired if current time is after `exp`
}

export function isUserAdmin(token) {
  const decoded = decodeToken(token);
  return decoded?.isAdmin === true;
}
