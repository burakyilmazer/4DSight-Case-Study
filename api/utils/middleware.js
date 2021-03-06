/* eslint-disable new-cap */
/* eslint-disable camelcase */
import Util from './utils';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import {secretKey} from '../src/config';
import User from '../models/user';
import mongoose  from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
const utils = new Util();
class Middleware {
	
	static async checkToken(req, res, next) {
		try {
			const token = req.headers.authorization;
			
			if (!token) {
				utils.setError(401, 'Unauthorized');
				return utils.send(res);
			}

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
				decoded.id = ObjectId(decoded.id);
				req.decoded = decoded;
				next();
				
			});
		}
		catch (error){
			throw error;
		}
	}
	
}

export default Middleware;