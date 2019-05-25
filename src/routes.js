const express = require('express');

// Controllers
const UserController = require('./controllers/UserController');
const TorneioController = require('./controllers/TorneioController');
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');

// Autenticadores
const authMiddleware = require('./middlewares/auth');
const authAdm = require('./middlewares/authAdmin');

const routes = express.Router();

// Cadastro e login
routes.post('/signup', UserController.register);
routes.post('/login', AuthController.login);

//Rotas normais

// Rotas Torneio
routes.get('/torneio/:id', authMiddleware, TorneioController.getOne);
routes.get('/torneio', authMiddleware, TorneioController.getAll);

//Rotas Postagens
routes.get('/post/:id', authMiddleware, PostController.getOne);
routes.get('/post', authMiddleware, PostController.getAll);

//Rotas para administradores

//Rotas Usuarios
routes.get('/users', authAdm, UserController.users);

// Rotas Torneio
routes.post('/torneio', authAdm, TorneioController.post);
routes.put('/torneio/:id', authAdm, TorneioController.update);
routes.delete('/torneio/:id', authAdm, TorneioController.del);

//Rotas Postagens
routes.post('/post', authAdm, PostController.post);
routes.put('/post/:id', authAdm, PostController.update);
routes.delete('/post/:id', authAdm, PostController.del);

module.exports = routes;
