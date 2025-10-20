import instance from "@/config/axios";

export const getAllUsers = async () => {
  try {
    const res = await instance.get("/users");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsersGrowth = async () => {
  try {
    const res = await instance.get("/users/growth");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
