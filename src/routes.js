const express = require('express');

// Controllers
const UserController = require('./controllers/UserController');
const TorneioController = require('./controllers/TorneioController');
const AuthController = require('./controllers/AuthController');

// Autenticadores
const authMiddleware = require('./middlewares/auth');
const authAdm = require('./middlewares/authAdmin');

const routes = express.Router();

// Cadastro e login
routes.post('/signup', UserController.register);
routes.post('/login', AuthController.login);

//Rotas normais
routes.get('/torneio/:id', authMiddleware, TorneioController.getOne);
routes.get('/torneio', authMiddleware, TorneioController.getAll);

//Rotas para administradores
routes.get('/users', authAdm, UserController.users);
routes.post('/torneio', authAdm, TorneioController.post);
routes.put('/torneio/:id', authAdm, TorneioController.update);
routes.delete('/torneio/:id', authAdm, TorneioController.del);

module.exports = routes;
