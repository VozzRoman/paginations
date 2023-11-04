import axios from "axios";

axios.defaults.baseURL = "https://dummyjson.com";

export const getProduct = async (pageSize ,skip) => {
	const response = await axios.get(`/products?limit=${pageSize}&skip=${skip}`);
	
	return response.data;
}

