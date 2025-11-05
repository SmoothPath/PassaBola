import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

/**
 * Busca notícias relacionadas ao futebol feminino usando NewsAPI
 * @returns {Promise<Array>} Lista de artigos ou array vazio em caso de erro
 */
export const getSportsNews = async () => {
  if (!API_KEY) {
    console.warn("⚠️ API_KEY não definida. Verifique seu arquivo .env");
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: "futebol feminino",
        language: "pt",
        sortBy: "publishedAt",
        apiKey: API_KEY,
      },
    });

    const artigos = response?.data?.articles || [];
    return Array.isArray(artigos) ? artigos : [];
  } catch (error) {
    const msg = error.response?.data?.message || error.message || "Erro desconhecido";
    console.error("Erro ao buscar notícias:", msg);
    return [];
  }
};
