const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Auth is needed'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new AuthError('Invalid token'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
