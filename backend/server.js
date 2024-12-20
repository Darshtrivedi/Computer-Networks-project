const express = require('express');
const cors = require('cors');
const { simulateGBN, simulateSR } = require('./protocols');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;


app.post('/simulate/gbn', (req, res) => {
    console.log("hi")
    const { packets, windowSize, lossRate , startPacket} = req.body;
    const result = simulateGBN(startPacket,packets, windowSize, lossRate);
    res.json(result);
});


app.post('/simulate/sr', (req, res) => {
    const {startPacket, packets, windowSize, lossRate } = req.body;
    const result = simulateSR(packets, windowSize, lossRate);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
