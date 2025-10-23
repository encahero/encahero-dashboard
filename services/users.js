import instance from "@/config/axios";

export const getAllUsers = async ({ searchValue, page, limit }) => {
  try {
    const queryString = new URLSearchParams();

    if (searchValue) queryString.append("searchValue", searchValue);
    if (page) queryString.append("page", String(page));
    if (limit) queryString.append("limit", String(limit));

    const res = await instance.get(`/users?${queryString.toString()}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersGrowth = async () => {
  try {
    const res = await instance.get("/users/growth");
    return res.data;
  } catch (error) {
    throw error;
  }
};
