const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 46400
	});
}

class UserController {
	async register(req, res) {
		try {
			const user = await User.create({ ...req.body, roles: [ 'user' ] });

			user.password = undefined;

			await req.io.emit('users', user);

			return res.json({
				user,
				token: generateToken({ id: user.id, roles: user.roles })
			});
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao cadastrar' });
		}
	}
	async users(req, res) {
		try {
			const users = await User.find(req.body).setOptions({
				sort: {
					createdAt: -1
				}
			});

			return res.json(users);
		} catch (err) {
			return res.status(400).send({ error: 'Não encontrado' });
		}
	}
}

module.exports = new UserController();
