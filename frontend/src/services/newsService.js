import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const getSportsNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: "futebol feminino",
        language: "pt",
        sortBy: "publishedAt",
        apiKey: API_KEY
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error.response || error.message);
    return [];
  }
};
