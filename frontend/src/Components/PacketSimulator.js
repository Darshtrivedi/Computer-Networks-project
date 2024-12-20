import React, { useState } from 'react';
import axios from 'axios';
import "../assets/styles.css"

function PacketSimulator() {
  const [protocol, setProtocol] = useState('gbn');
  const [windowSize, setWindowSize] = useState(4);
  const [lossRate, setLossRate] = useState(0.2);
  const [packets, setPackets] = useState([]);
  const [totalPackets, setTotalPackets] = useState(10);
  const [lostPackets , setLostPackets] = useState([])
  const [startPacket , setStartPacket] = useState(1)

  const simulate = async () => {
    if(lostPackets?.length>0){
      
      setStartPacket(lostPackets[0].id)
    }
    const response = await axios.post(`http://localhost:5000/simulate/${protocol}`, {
      packets: totalPackets,
      windowSize: windowSize,
      lossRate: lossRate,
      startPacket : 1
    });
    console.log("response : ",response.data.packets)
    setPackets(response.data.packets);
    if(protocol === 'gbn'){
    setLostPackets(response.data.lostPackets);
    }
    else{
      setLostPackets([])
    }
  };

  return (
    <div>
      <div className="inputs">
        <label>
          Protocol:
          <select onChange={(e) => setProtocol(e.target.value)}>
            <option value="gbn">Go-Back-N</option>
            <option value="sr">Selective Repeat</option>
          </select>
        </label>
        <label>
          Window Size:
          <input
            type="number"
            value={windowSize}
            onChange={(e) => setWindowSize(Number(e.target.value))}
          />
        </label>
        <label>
          Total Packets:
          <input
            type="number"
            value={totalPackets}
            onChange={(e) => setTotalPackets(Number(e.target.value))}
          />
        </label>
        <label>
          Loss Rate:
          <input
            type="number"
            step="0.1"
            value={lossRate}
            onChange={(e) => setLossRate(Number(e.target.value))}
          />
        </label>
        <button onClick={simulate}>Simulate</button>
      </div>

      <div className="output">
        {packets.length > 0 && (
          <div>
            <h2>Simulation Result</h2>
            <div className="packet-container">
              {packets.map((packet, index) => (
                <div
                  key={index}
                  className={`packet ${packet.status === 'Lost' ? 'lost' : 'success'}`}
                >
                  {`Packet ${packet.id}: ${packet.status}`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <hr />
      
        {lostPackets?.length > 0 && (
          <div className="output">
          <div>
            <h2>Not Acknowledged Packets</h2>
            <div className="packet-container">
              {lostPackets.map((packet, index) => (
                <div
                  key={index}
                  className={`packet ${packet.status === 'Lost' ? 'lost' : 'success'}`}
                >
                  {`Packet ${packet.id}: ${packet.status}`}
                </div>
              ))}
            </div>
          </div>
      </div>

        )}
    </div>
  );
}

export default PacketSimulator;
