const express = require('express');
const {
  validateUpdateUser,
  validateCreateUser,
  validateLogin,
} = require('../middlewares/errorValidator');
const NotFound = require('../errors/notFound');
const auth = require('../middlewares/auth');

const router = express.Router();
const {
  updateUser, aboutMe, login, createUser, getUsers,
} = require('../controllers/users');

router.post('/signin/', validateLogin, login);
router.post('/signup/', validateCreateUser, createUser);

router.get('/users/', getUsers);
router.get('/users/me', auth, aboutMe);
router.patch('/users/me', auth, validateUpdateUser, updateUser);

router.all('*', (req, res, next) => {
  next(new NotFound('Page not found'));
});

module.exports = router;
