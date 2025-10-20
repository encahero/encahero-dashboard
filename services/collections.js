import instance from "@/config/axios";

export const getAllCollections = async () => {
  try {
    const res = await instance.get("/collections");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createCollection = async (name, categoryName) => {
  try {
    const res = await instance.post("/collections", { name, categoryName });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCollection = async (id, name, categoryName) => {
  try {
    const res = await instance.patch(`/collections/${id}`, {
      name,
      categoryName,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async (id) => {
  try {
    const res = await instance.delete(`/collections/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
