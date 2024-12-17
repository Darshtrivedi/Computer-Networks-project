const express = require('express');
const cors = require('cors');
const { simulateGBN, simulateSR } = require('./protocols');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Endpoint for Go-Back-N simulation
app.post('/simulate/gbn', (req, res) => {
    const { packets, windowSize, lossRate } = req.body;
    const result = simulateGBN(packets, windowSize, lossRate);
    res.json(result);
});

// Endpoint for Selective Repeat simulation
app.post('/simulate/sr', (req, res) => {
    const { packets, windowSize, lossRate } = req.body;
    const result = simulateSR(packets, windowSize, lossRate);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
