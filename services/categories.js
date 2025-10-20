import instance from "@/config/axios";

export const getAllCategories = async () => {
  try {
    const res = await instance.get("/categories");
    return res.data;
  } catch (error) {
    throw new error();
  }
};

export const createCategory = async (name) => {
  try {
    const res = await instance.post("/categories", { name });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await instance.delete(`/categories/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, name) => {
  try {
    const res = await instance.patch(`/categories/${id}`, { name });
    return res.data;
  } catch (error) {
    throw error;
  }
};
