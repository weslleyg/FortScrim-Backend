const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [ true, 'Não pode estar em branco' ],
			match: [ /^[a-zA-Z0-9]+$/, 'is invalid' ],
			index: true
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [ true, 'Não pode estar em branco' ],
			match: [ /\S+@\S+\.\S+/, 'is invalid' ],
			index: true
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		roles: [
			{
				type: String,
				required: true,
				enum: [ 'user', 'admin' ],
				default: 'user'
			}
		]
	},
	{ timestamps: true }
);

User.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

User.plugin(uniqueValidator, { message: 'Ja esta cadastrado!' });

module.exports = mongoose.model('User', User);
