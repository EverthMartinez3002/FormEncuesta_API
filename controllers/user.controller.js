const db = require('../db/models/index.js');
const bcrypt = require('bcrypt');
const { createAccessToken } = require("../utils/jwt.tools.js");

const userController = {};

userController.register = async (req, res) => {
    try {
        const { username, password, email, Admin } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
        }

        const existingUser = await db.User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }

        const saltRounds = 8;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.User.create({ username, password: hashedPassword, email, Admin });

        return res.status(201).json({ message: 'Usuario registrado con éxito.' });

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

userController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.User.findOne({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ error: "El usuario no existe" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = createAccessToken(user);

        return res.status(200).json({ token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};

userController.GetAllNormalUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({
            where: { Admin: false },
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No hay usuarios" });
        }

        const Users = users.map((user) => {
            const { password, email, Admin, ...sanitizedUser } = user.toJSON();
            return sanitizedUser;
        });

        return res.status(200).json({ users: Users });
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

userController.GetAllNormalUserByEncuesta = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = userController;
