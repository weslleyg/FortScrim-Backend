const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 46400
	});
}

class AuthController {
	async login(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).select('+password');

		if (!user) return res.status(400).send({ error: 'Email invalido' });

		if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Senha invalida' });

		user.password = undefined;

		res.send({
			user,
			token: generateToken({ id: user.id, roles: user.roles, username: user.username })
		});
	}
}

module.exports = new AuthController();
