import UserService from '../services/UserService';
import Util from '../utils/utils';
const util = new Util();

class UserController {
  
	/**
	 * @route GET /my-profile
	 * @group Api
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
  
	static async myProfile(req, res) {
		try {
			const result = await UserService.myProfile(req);
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
	 * @route GET /code
	 * @group Api
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
  
	static async code(req, res) {
		try {
			const result = await UserService.code(req);
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

export default UserController;