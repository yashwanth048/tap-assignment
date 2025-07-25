
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [network, setNetwork] = useState({ type: '', downlink: '' });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude.toFixed(4),
          lon: position.coords.longitude.toFixed(4)
        });
      });
    } else {
      alert('Geolocation not supported');
    }
  }, []);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      setNetwork({
        type: connection.effectiveType,
        downlink: connection.downlink
      });
    } else {
      setNetwork({
        type: 'Unavailable',
        downlink: 'N/A'
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI);
    ctx.fill();
  }, [location]);

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>📍 Smart Connectivity & Location Dashboard</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>🌐 Network Information:</h3>
        <p><strong>Connection Type:</strong> {network.type}</p>
        <p><strong>Downlink Speed:</strong> {network.downlink} Mbps</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>📌 Your Location:</h3>
        <p><strong>Latitude:</strong> {location.lat}</p>
        <p><strong>Longitude:</strong> {location.lon}</p>
      </div>

      <div>
        <h3>🎨 Canvas (User Position Marker):</h3>
        <canvas ref={canvasRef} width={300} height={300} style={{ border: '1px solid black' }}></canvas>
      </div>
    </div>
  );
}

export default App;
