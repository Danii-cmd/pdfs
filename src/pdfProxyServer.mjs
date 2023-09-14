import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3001; // Puerto para el servidor de reenvío

// Configurar las cabeceras CORS para permitir solicitudes desde http://localhost:5173
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Ruta para obtener el PDF desde GitHub
app.get('/pdf', async (req, res) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Danii5203/pdfs-2/main/Debayle.pdf');
    const pdfBuffer = await response.buffer();
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el PDF.');
  }
});

app.listen(port, () => {
  console.log(`Servidor de reenvío escuchando en http://localhost:${port}`);
});
