// ================= KEYS =================
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_OBJECT = "user";

// ================= ACCESS TOKEN =================
export async function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// ================= REFRESH TOKEN =================
export async function setRefreshToken(token) {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export async function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export async function clearRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// ================= USER =================
export async function setUser(user) {
  try {
    localStorage.setItem(USER_OBJECT, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

export async function getUser() {
  try {
    const userString = localStorage.getItem(USER_OBJECT);
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Error reading user:", error);
    return null;
  }
}

export async function clearUser() {
  try {
    localStorage.removeItem(USER_OBJECT);
  } catch (error) {
    console.error("Error clearing user:", error);
  }
}

// ================= CLEAR ALL =================
export async function clearAllTokens() {
  await clearAccessToken();
  await clearRefreshToken();
}
