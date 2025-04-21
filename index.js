const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8080;

// Cek koneksi
app.get('/ping', (req, res) => {
  res.send('Server aktif 🚀');
});

// Proxy semua request dari /v5/* ke Bybit
app.get('/v5/:section/:endpoint', async (req, res) => {
  try {
    const { section, endpoint } = req.params;
    const query = new URLSearchParams(req.query).toString();
    const bybitUrl = `https://api.bybit.com/v5/${section}/${endpoint}?${query}`;
    
    const response = await axios.get(bybitUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
