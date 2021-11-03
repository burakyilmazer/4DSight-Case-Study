
import express from 'express';
import AuthController from '../controllers/AuthController';

const app = express();

app.post('/signup', AuthController.signUp);
app.post('/login', AuthController.login);

module.exports = app;
