import axios from "axios";

const API_KEY = "35927558-9e8084c34f45b7ac0ac0ad9f0";
axios.defaults.baseURL = "https://pixabay.com/api/";
// axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.headers = "Access-Control-Allow-Origin";
axios.defaults.params = {
  orientation: "horizontal",
  per_page: 12,
};

export const fetchImages = async (query, page) => {
  try {
    const data = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
