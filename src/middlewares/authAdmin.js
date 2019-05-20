const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).send({ error: 'No token provided' });

	const parts = authHeader.split(' ');

	if (!parts.length === 2) return res.status(401).send({ error: 'Token error' });

	const [ scheme, token ] = parts;

	if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' });

	jwt.verify(token, authConfig.secret, (error, decoded) => {
		if (error) {
			res.status(401).json({
				message: 'Token inválido'
			});
		} else {
			if (decoded.roles.includes('admin')) {
				req.userId = decoded.id;
				req.userName = decoded.username;
				req.roles = decoded.roles;
				return next();
			} else {
				res.status(403).json({
					message: 'Esta funcionalidade é restrita para administradores!'
				});
			}
		}
	});
};
