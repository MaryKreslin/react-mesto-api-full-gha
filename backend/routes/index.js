const routes = require('express').Router();
const { login, createUser } = require('../controllers/user');
const userRouter = require('./user');
const cardRouter = require('./card');
const { ValidateSignin, ValidateSignup } = require('../middlewares/validateUser');
const { auth } = require('../middlewares/auth');

routes.post('/signup', ValidateSignup, createUser);
routes.post('/signin', ValidateSignin, login);

routes.use('/users', auth, userRouter);

routes.use('/cards', auth, cardRouter);

module.exports = routes;
