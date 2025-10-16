//routes/sthRoutes
const express = require("express");
const axios = require("axios");

const router = express.Router();

// IP da VM com STH-Comet
const BASE_URL = "http://20.220.27.106:8666/STH/v1/contextEntities/type/Munhequeira/id/urn:ngsi-ld:Munhequeira:001/attributes";

router.get("/", async (req, res) => {
  try {
    const headers = {
  "Fiware-Service": "smart",
  "Fiware-ServicePath": "/",
};

const [tempRes, batRes, calRes] = await Promise.all([
  axios.get(`${BASE_URL}/temperatura?lastN=30`, { headers }),
  axios.get(`${BASE_URL}/batimento?lastN=30`, { headers }),
  axios.get(`${BASE_URL}/calorias?lastN=30`, { headers }),
]);

    const parseData = (res, atributo) => {
      const valores = res.data.contextResponses?.[0]?.contextElement?.attributes?.[0]?.values || [];
      return valores.map(v => ({
        atributo,
        value: parseFloat(v.attrValue),
        time: new Date(v.recvTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      }));
    };

    const data = {
      temperatura: parseData(tempRes, "temperatura"),
      batimento: parseData(batRes, "batimento"),
      calorias: parseData(calRes, "calorias"),
    };

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados do STH-Comet:", error.message);
    res.status(500).json({ error: "Falha ao obter dados" });
  }
});

module.exports = { router };
