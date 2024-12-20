function simulateGBN(startPacket = 1 , totalPackets, windowSize, lossRate) {``
    var startPacketNumber = 0
    if(startPacket == -1){
        startPacketNumber = 1
    }
    else{
        startPacketNumber = startPacket
    }
    let packets = [];
    let base = 0;
    let lostFlag = false;
    let lostPackets = []
    console.log("start packet : ",startPacket)
    for (let i = startPacket; i <= totalPackets; i++) {
        const lost = Math.random() < lossRate;
        if(lostFlag){
            lostPackets.push({
                id:i,
                status : "Not Acknowledged"
            })
        }
        else{
        packets.push({
            id: i,
            status: lost ? 'Lost' : 'Success',
        });
    }
        if (lost) {
            base = i; 
            lostFlag = true;
        }
    }
    return { packets, windowSize, protocol: 'Go-Back-N' , lostPackets};
}



function simulateSR(totalPackets, windowSize, lossRate) {
    let packets = [];
    for (let i = 1; i <= totalPackets; i++) {
        const lost = Math.random() < lossRate;
        packets.push({
            id: i,
            status: lost ? 'Lost' : 'Success',
        });
    }
    return { packets, windowSize, protocol: 'Selective Repeat' };
}

module.exports = { simulateGBN, simulateSR };
