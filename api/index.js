/* eslint-disable camelcase */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { swaggerOptions, mongo_connections } from './src/config';
import http from 'http';

const app = express();
const server = http.createServer(app);


const  expressSwagger = require('express-swagger-generator')(app);
const port = 3000;
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(upload.any());

app.use(cors());
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
// mongoose.connect(
// 	mongo_connections[env].host, 
// 	{ 
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 		auth: mongo_connections[env].auth,
// 		user: mongo_connections[env].user,
// 		pass: mongo_connections[env].pass
// 	});

// mongoose.set('useFindAndModify', true);

app.get('/health', async (req, res) => {
	
	res.json({
		type: true,
		message: 'Deployment is running!'
	});
	
});

// app.use('/private', privateRoute);

expressSwagger(swaggerOptions);


server.listen(port, () => {
	console.log('server is running on port ', port);
});

export default server;
