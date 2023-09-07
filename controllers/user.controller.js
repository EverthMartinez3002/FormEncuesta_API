const db = require('../db/models/index.js'); // Asegúrate de que la ruta del modelo sea correcta
const userController = {};

userController.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
        }

        const newUser = await db.User.create({ username, password, email });

        return res.status(201).json({ message: 'Usuario registrado con éxito.', user: newUser });

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

module.exports = userController;
