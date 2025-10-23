import instance from "@/config/axios";

export const getAllCards = async ({
  searchValue,
  collectionName,
  type,
  page,
  rowQuantity,
}) => {
  try {
    // Convert query object to query string
    const queryString = new URLSearchParams();

    if (searchValue) queryString.append("searchValue", searchValue);
    if (collectionName && collectionName !== "all")
      queryString.append("collectionName", collectionName);
    if (type && type !== "all") queryString.append("type", type);
    if (page) queryString.append("page", String(page));
    if (rowQuantity) queryString.append("limit", String(rowQuantity));

    const res = await instance.get(`/cards?${queryString.toString()}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createCard = async (formData) => {
  try {
    const res = await instance.post("/cards", formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCard = async (id, formData) => {
  try {
    const res = await instance.patch(`/cards/${id}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCard = async (id) => {
  try {
    const res = await instance.delete(`/cards/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
