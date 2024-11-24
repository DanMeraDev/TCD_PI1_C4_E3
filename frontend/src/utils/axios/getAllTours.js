import axiosApi from "./axiosService";

export const getAllTours = async () => {
  try {
    const response = await axiosApi.get("/tours");
    return response.data;
  } catch (error) {
    console.log("Error al obtener los tours: ", error);
    throw error;
  }
};
