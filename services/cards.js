import instance from "@/config/axios";

export const getAllCards = async () => {
  try {
    const res = await instance.get("/cards");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createCard = async (formData) => {
  try {
    const res = await instance.post("/cards", formData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCard = async (id, formData) => {
  try {
    const res = await instance.patch(`/cards/${id}`, formData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCard = async (id) => {
  try {
    const res = await instance.delete(`/cards/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
