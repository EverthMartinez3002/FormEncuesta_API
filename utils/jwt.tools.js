const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET || 'SuperSecret';
const tools = {};

tools.createAccessToken = (user) => {
    const expTime = process.env.TOKEN_EXP || '1d';
    return jwt.sign({ user }, secret, { expiresIn: expTime });
  };
  

tools.createRefreshToken = (_id) => {
  const expTime = process.env.TOKEN_EXP || '1d';
  const { dataValues } = _id;
  return jwt.sign({ user: _id }, secret, { expiresIn: expTime });
};

tools.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return false;
  }
};

module.exports = tools;
