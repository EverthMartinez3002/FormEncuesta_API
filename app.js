const express = require('express');
const app = express();
const port = 3000; // Elige un puerto para tu aplicación

// Define rutas y manejo de peticiones aquí

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  });
