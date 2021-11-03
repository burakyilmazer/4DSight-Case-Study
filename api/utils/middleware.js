/* eslint-disable camelcase */
import Util from './utils';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import {secretKey} from '../src/config';
import User from '../models/user';

const utils = new Util();
exports.middleware = function(){
	return async (req, res, next) => {
		const token = req.headers.authorization;
		
		const user = await User.findOne({token});
		
		if (!user) {
			utils.setError(401, 'Unauthorized');
			return utils.send(res);
		}

		jwt.verify(token, md5(secretKey), async (err, decoded) => {

			if (!decoded || err) {
				utils.setError(401,  'Unauthorized');
				return utils.send(res);
			}
  
			req.decoded = decoded;
			next();
    
		});
	};
};