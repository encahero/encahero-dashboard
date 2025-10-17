import instance from "@/config/axios";

export const getAllCollections = async () => {
  try {
    const res = await instance.get("/collections");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
