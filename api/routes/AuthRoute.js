
import express from 'express';
import AuthController from '../controllers/AuthController';
import Middleware  from '../utils/middleware';
const app = express();

app.post('/signup', AuthController.signUp);
app.post('/login', AuthController.login);
app.get('/logout', Middleware.checkToken, AuthController.logout);

module.exports = app;
