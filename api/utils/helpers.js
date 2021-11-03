export default class Helpers {

	static getFileRoute(filename) {

		const string = filename.split('.')[0].split('Route')[0].toLowerCase();
		return string;

	}

	static generateRandomPassword() {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0;i < 8;i += 1) {

			result += characters.charAt(Math.floor(Math.random() * charactersLength));

		}
		return result;
	}

}
