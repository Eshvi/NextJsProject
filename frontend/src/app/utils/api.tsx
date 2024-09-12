import axios from "axios";

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALL_PRODUCTS}`);
    console.log("res", res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
