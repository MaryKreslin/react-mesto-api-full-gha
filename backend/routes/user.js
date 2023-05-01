const router = require('express').Router();

const {
  getUsers, getUserOnId, patchProfile, patchAvatar, getCurentUser,
} = require('../controllers/user');
const { ValidateUserId, ValidateProfile, ValidateAvatar } = require('../middlewares/validateUser');

router.get('/', getUsers);

router.get('/me', getCurentUser);

router.get('/:id', ValidateUserId, getUserOnId);

router.patch('/me', ValidateProfile, patchProfile);

router.patch('/me/avatar', ValidateAvatar, patchAvatar);

module.exports = router;
