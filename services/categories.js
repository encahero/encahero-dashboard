import instance from "@/config/axios";

export const getAllCategories = async () => {
  try {
    const res = await instance.get("/categories");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
