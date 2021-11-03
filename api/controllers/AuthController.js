/**
 * @typedef SignUpCreateReq
 * @property {string} name
 * @property {string} surname
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef LoginReq
 * @property {string} email
 * @property {string} password
 */
import AuthService from '../services/AuthService';
import Util from '../utils/utils';
const util = new Util();

class AuthController {
  
	/**
	 * @route POST /signup
	 * @group Api
	 * @param {SignUpCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
  
	static async signUp(req, res) {
		try {
			const result = await AuthService.signUp(req);
			if (!result.type) {
				util.setError(200, result.message);
				return util.send(res);
			}
			util.setSuccess(200, result.message, result.data);
			return util.send(res);
		}
		catch (error){
			util.setError(400, error.toString());
			return util.send(res);
		}
	}
  
	/**
	 * @route POST /login
	 * @group Api
	 * @param {LoginReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
  
	static async login(req, res) {
		try {
			const result = await AuthService.login(req);
			if (!result.type) {
				util.setError(200, result.message);
				return util.send(res);
			}
			util.setSuccess(200, result.message, result.data);
			return util.send(res);
		}
		catch (error){
			util.setError(400, error.toString());
			return util.send(res);
		}
	}
	
	/**
	 * @route GET /logout
	 * @group Api 
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	
	static async logout(req, res) {
		try {
				 const result = await AuthService.logout(req);
			if (!result.type) {
				util.setError(200, result.message);
				return util.send(res);
			}
			util.setSuccess(200, result.message, result.data);
			return util.send(res);
		}
		catch (error){
			util.setError(400, error.toString());
			return util.send(res);
		}
	}
  
}

export default AuthController;