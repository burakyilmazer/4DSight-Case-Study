import User from '../models/user';

class UserService {

	static async myProfile(req) {
		try {
			const userId = req.decoded.id;
			const user = await User.findOne({_id: userId});

			if (!user) {
				return {type: false, message: 'Not found profile'};
			}

			return {type: true, message: 'Profile information brought', data: user};
		}
		catch (error){
			throw error;
		}
	}

	static async code(req) {
		try {
			const userId = req.decoded.id;
			const user = await User.findOne({_id: userId});

			if (!user) {
				return {type: false, message: 'Not found name and surname'};
			}

			let word = `${user.name}${user.surname}`;	   

			word = word.split('');

			let i = word.length - 1;
			while (i > 0 && word[i - 1] >= word[i])
				i--;
  
			if (i <= 0) {
				return {type: false, message: 'Failed to generate code'};
			}
      
			let j = word.length - 1;
			while (word[j] <= word[i - 1])
				j--;

			let temp = word[i - 1];
			word[i - 1] = word[j];
			word[j] = temp;
      
			j = word.length - 1;
			while (i < j) {
				temp = word[i];
				word[i] = word[j];
				word[j] = temp;
				i++;
				j--;
			}
  
			const code = word.join('');

			return {type: true, message: 'Code generated', data: code};
      
		}
		catch (error){
			throw error;
		}
	}

}

export default UserService;