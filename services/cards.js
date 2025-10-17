import instance from "@/config/axios";

export const getAllCards = async () => {
  try {
    const res = await instance.get("/cards");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
