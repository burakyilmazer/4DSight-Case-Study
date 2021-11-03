/* eslint-disable camelcase */
import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import Utils from '../utils/utils';
import { secretKey } from '../src/config/settings';
import Helpers from '../utils/helpers';

const app = express();
const utils = new Utils();
const basename = path.basename(__filename);

app.use(async (req, res, next) => {

	const token = req.headers.authorization;

	jwt.verify(token, md5(secretKey), async (err, decoded) => {

		if (!decoded || err) {
			utils.setError(401, 'Unauthorized');
			return utils.send(res);
		}

		req.decoded = decoded;

		next();
	
	});

});

const folderRoute = `${__dirname}/routes`;
require('fs')
 	.readdirSync(folderRoute)
 	.filter((file) => {

 		return (
 			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
 		);

 	})
 	.forEach((file) => {

 		const routeName = Helpers.getFileRoute(file);
 		app.use(
 			`/api/${routeName}`,
 			require(folderRoute + path.sep + file.split('.')[0])
 		);
	
	});

module.exports = app;