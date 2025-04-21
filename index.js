// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const BYBIT_BASE = "https://api.bybit.com";

app.get("/v2/public/tickers", async (req, res) => {
  try {
    const response = await axios.get(`${BYBIT_BASE}/v2/public/tickers`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Untuk endpoint lain, tinggal tambah sesuai kebutuhan

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
