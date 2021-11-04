/* eslint-disable new-cap */
import User from '../models/user';
import {encyrptText, secretKey} from '../src/config';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import mongoose  from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

class AuthService {
  
	static async signUp(req) {
		try {
			const { body } = req;
			
			const encyrptPassword = md5(md5(body.password) + encyrptText);
			body.password = encyrptPassword;
			
			const createUser = await User.create(body);
			
			if (!createUser) {
				return {type: false, message: 'Failed create user'};
			}
			
			const token = jwt.sign({
				id: createUser._id
			}, md5(secretKey), {
				expiresIn: 86400
			});
			
			await User.findOneAndUpdate({_id: ObjectId(createUser._id)}, {token});
			const createUserJson = JSON.parse(JSON.stringify(createUser));
			delete createUserJson.password;
		  createUserJson.token = token;

		  return {type: true, message: 'Success create user', data: createUserJson};

		}
		catch (error){
			throw error;
		}
	}
	
	static async login(req) {
		try {
			const {body} = req;
			const foundUser = await User.findOne ({ email: body.email });

			if (!foundUser) {
				return {type: false, message: 'Email or password wrong'};
			}

			const encyrptPassword = md5(md5(body.password) + encyrptText);
			if (encyrptPassword !== foundUser.password) {
				return {type: false, message: 'Email or password wrong'};
			}

			const token = jwt.sign({
				id: foundUser._id
			}, md5(secretKey), {
				expiresIn: 86400
			});

			await User.findOneAndUpdate({_id: ObjectId(foundUser._id)}, {token});

			return {type: true, message: 'Success login', data: {token: token}};
		}
		catch (error){
			throw error;
		}
	}
	
	static async logout(req) {
		try {
			const userId = req.decoded.id;
			await User.findOneAndUpdate({_id: userId}, {token: ''});
			return {type: true, message: 'Success Logout'};
		}
		catch (error){
			throw error;
		}
	}
	
}

export default AuthService;