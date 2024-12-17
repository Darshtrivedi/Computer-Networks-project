function simulateGBN(totalPackets, windowSize, lossRate) {
    let packets = [];
    let base = 0;

    for (let i = 0; i < totalPackets; i++) {
        const lost = Math.random() < lossRate;
        packets.push({
            id: i,
            status: lost ? 'Lost' : 'Success',
        });

        if (lost) {
            base = i; // Retransmit from base
            break;
        }
    }

    return { packets, windowSize, protocol: 'Go-Back-N' };
}

function simulateSR(totalPackets, windowSize, lossRate) {
    let packets = [];
    for (let i = 0; i < totalPackets; i++) {
        const lost = Math.random() < lossRate;
        packets.push({
            id: i,
            status: lost ? 'Lost' : 'Success',
        });
    }
    return { packets, windowSize, protocol: 'Selective Repeat' };
}

module.exports = { simulateGBN, simulateSR };
