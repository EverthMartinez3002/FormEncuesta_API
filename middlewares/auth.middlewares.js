const jwt = require('../utils/jwt.tools');
const db = require('../db/models/index');

const middlewares = {};

const tokenPrefix = "Bearer";

middlewares.authenticationSession = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        const [prefix, token] = authorization.split(" ");

        if (prefix !== tokenPrefix) {
            return res.status(401).json({ error: "No autorizado" });
        }

        if (!token) {
            return res.status(401).json({ error: "No autorizado" });
        }

        const tokenObject = jwt.verifyToken(token);

        if (!tokenObject) {
            return res.status(401).json({ error: "No autorizado" });
        }

        const userId = tokenObject.user.id;
        const user = await db.User.findByPk(userId);

        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        req.user = user;

        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = middlewares