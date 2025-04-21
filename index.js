const express = require('express');
const axios = require('axios');
const app = express();

// GUNAKAN PORT DARI ENV
const PORT = process.env.PORT || 8080;

app.get('/price', async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).send("Missing symbol");

  try {
    const response = await axios.get(`https://api.bybit.com/v2/public/tickers?symbol=${symbol}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
