import express from 'express';
import path from 'path';

const app = express();
const basename = path.basename(__filename);

const folderRoute = `${__dirname}/routes`;
require('fs')
 	.readdirSync(folderRoute)
 	.filter((file) => {

 		return (
 			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
 		);

 	})
 	.forEach((file) => {

 		app.use(
 			'/',
 			require(folderRoute + path.sep + file.split('.')[0])
 		);
	
	});

module.exports = app;