import instance from "@/config/axios";

export const login = async ({ email, password, deviceId }) => {
  try {
    const res = await instance.post("auth/login", {
      email,
      password,
      deviceId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async ({ token }) => {
  try {
    const res = await instance.post("auth/logout", { token });
    return res.data;
  } catch (error) {
    throw error;
  }
};
