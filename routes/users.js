const express = require('express');

const router = express.Router();
const {
  login,
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
// router.post('/', createUser);
router.get('/', getUsers);
router.get('/:user_id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
