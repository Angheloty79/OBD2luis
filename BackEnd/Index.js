const express = require('express');
const SerialPort = require('serialport');
const OBDReader = require('obd-parser');
const cors = require('cors');

const app = express();
app.use(cors());  // Permite que tu aplicación React se comunique con el backend

// Configura el puerto serial según el sistema operativo
const portName = process.platform === 'win32' ? 'COM3' : '/dev/ttyUSB0'; // Cambia 'COM3' o '/dev/ttyUSB0' al puerto correcto

try {
    const port = new SerialPort(portName, { baudRate: 9600 });

    port.on('open', () => {
        console.log('Puerto serie abierto correctamente.');
    });

    port.on('error', (err) => {
        console.error('Error en el puerto serie:', err.message);
    });

    const obdReader = new OBDReader(port);
    let obdData = {};

    obdReader.on('dataReceived', data => {
        console.log('Datos OBD2 recibidos:', data);
        obdData = data;  // Almacena los datos recibidos
    });

    obdReader.connect();

    // Ruta para obtener los datos OBD2
    app.get('/obd-data', (req, res) => {
        res.json(obdData);  // Envía los datos OBD2 al frontend
    });

    // Inicia el servidor en el puerto 4000
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });

} catch (err) {
    console.error('Error al intentar abrir el puerto:', err.message);
}
