/* eslint-disable camelcase */
import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
	name: {type: String, trim: false},
	surname: {type: String, trim: false},
	email: {type: String, trim: false, unique: true},
	password: {type: String, trim: false},
	token: {type: String}
});

module.exports = mongoose.model('Users', userSchema, 'Users');