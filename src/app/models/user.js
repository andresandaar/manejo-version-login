const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = new mongoose.Schema({
	local: {
		email: String,
		password: String,
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		password: String,
	},
	twitter: {
		id: String,
		token: String,
		email: String,
		password: String,
	},
	google: {
		id: String,
		token: String,
		email: String,
		password: String,
	},
});
userSchema.methods.generatehash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// validacion de la contraseña
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};
//crear el modelo para el usuario y exponerlo a nuestra aplicación
module.exports = mongoose.model('User', userSchema);
