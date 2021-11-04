
import express from 'express';
import UserController from '../controllers/UserController';
import Middleware  from '../utils/middleware';

const app = express();

app.get('/my-profile', Middleware.checkToken, UserController.myProfile);
app.get('/code', Middleware.checkToken, UserController.code);

module.exports = app;
