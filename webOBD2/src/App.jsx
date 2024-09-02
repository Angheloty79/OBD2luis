
import React, { useEffect, useState } from 'react';

function App() {
  
  const [obdData, setObdData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/obd-data')
      .then(response => response.json())
      .then(data => setObdData(data));
  }, []);

  return (
    <>
      <div>
      <h1>Datos del OBD2</h1>
      {obdData ? (
        <div>
          <p>{JSON.stringify(obdData)}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
    
    </>
  )
}

export default App
