import instance from "@/config/axios";

export const getAllFeedBack = async () => {
  try {
    const res = await instance.get("/feedback");
    return res.data;
  } catch (error) {
    throw error;
  }
};
